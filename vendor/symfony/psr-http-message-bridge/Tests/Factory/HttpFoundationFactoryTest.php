<?php

/*
 * This file is part of the Symfony package.
 *
 * (c) Fabien Potencier <fabien@symfony.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Symfony\Bridge\PsrHttpMessage\Tests\Factory;

use PHPUnit\Framework\TestCase;
use Psr\Http\Message\UploadedFileInterface;
use Symfony\Bridge\PsrHttpMessage\Factory\HttpFoundationFactory;
use Symfony\Bridge\PsrHttpMessage\Tests\Fixtures\Response;
use Symfony\Bridge\PsrHttpMessage\Tests\Fixtures\ServerRequest;
use Symfony\Bridge\PsrHttpMessage\Tests\Fixtures\Stream;
use Symfony\Bridge\PsrHttpMessage\Tests\Fixtures\UploadedFile;
use Symfony\Bridge\PsrHttpMessage\Tests\Fixtures\Uri;
use Symfony\Component\HttpFoundation\Cookie;

/**
 * @author Kévin Dunglas <dunglas@gmail.com>
 */
class HttpFoundationFactoryTest extends TestCase
{
    /** @var HttpFoundationFactory */
    private $factory;

    /** @var string */
    private $tmpDir;

    public function setup()
    {
        $this->factory = new HttpFoundationFactory();
        $this->tmpDir = sys_get_temp_dir();
    }

    public function testCreateRequest()
    {
        $stdClass = new \stdClass();
        $serverRequest = new ServerRequest(
            '1.1',
            array(
                'X-Dunglas-API-Platform' => '1.0',
                'X-data' => array('a', 'b'),
            ),
            new Stream('The body'),
            '/about/kevin',
            'GET',
            'http://les-tilleuls.coop/about/kevin',
            array('country' => 'France'),
            array('city' => 'Lille'),
            array('url' => 'http://les-tilleuls.coop'),
            array(
                'doc1' => $this->createUploadedFile('Doc 1', UPLOAD_ERR_OK, 'doc1.txt', 'text/plain'),
                'nested' => array(
                    'docs' => array(
                        $this->createUploadedFile('Doc 2', UPLOAD_ERR_OK, 'doc2.txt', 'text/plain'),
                        $this->createUploadedFile('Doc 3', UPLOAD_ERR_OK, 'doc3.txt', 'text/plain'),
                    ),
                ),
            ),
            array('url' => 'http://dunglas.fr'),
            array('custom' => $stdClass)
        );

        $symfonyRequest = $this->factory->createRequest($serverRequest);
        $files = $symfonyRequest->files->all();

        $this->assertEquals('http://les-tilleuls.coop', $symfonyRequest->query->get('url'));
        $this->assertEquals('doc1.txt', $files['doc1']->getClientOriginalName());
        $this->assertEquals('doc2.txt', $files['nested']['docs'][0]->getClientOriginalName());
        $this->assertEquals('doc3.txt', $files['nested']['docs'][1]->getClientOriginalName());
        $this->assertEquals('http://dunglas.fr', $symfonyRequest->request->get('url'));
        $this->assertEquals($stdClass, $symfonyRequest->attributes->get('custom'));
        $this->assertEquals('Lille', $symfonyRequest->cookies->get('city'));
        $this->assertEquals('France', $symfonyRequest->server->get('country'));
        $this->assertEquals('The body', $symfonyRequest->getContent());
        $this->assertEquals('1.0', $symfonyRequest->headers->get('X-Dunglas-API-Platform'));
        $this->assertEquals(array('a', 'b'), $symfonyRequest->headers->get('X-data', null, false));
    }

    public function testCreateRequestWithNullParsedBody()
    {
        $serverRequest = new ServerRequest(
            '1.1',
            array(),
            new Stream(),
            '/',
            'GET',
            null,
            array(),
            array(),
            array(),
            array(),
            null,
            array()
        );

        $this->assertCount(0, $this->factory->createRequest($serverRequest)->request);
    }

    public function testCreateRequestWithObjectParsedBody()
    {
        $serverRequest = new ServerRequest(
            '1.1',
            array(),
            new Stream(),
            '/',
            'GET',
            null,
            array(),
            array(),
            array(),
            array(),
            new \stdClass(),
            array()
        );

        $this->assertCount(0, $this->factory->createRequest($serverRequest)->request);
    }

    public function testCreateRequestWithUri()
    {
        $serverRequest = new ServerRequest(
            '1.1',
            array(),
            new Stream(),
            '/',
            'GET',
            new Uri('http://les-tilleuls.coop/about/kevin'),
            array(),
            array(),
            array(),
            array(),
            null,
            array()
        );

        $this->assertEquals('/about/kevin', $this->factory->createRequest($serverRequest)->getPathInfo());
    }

    public function testCreateUploadedFile()
    {
        $uploadedFile = $this->createUploadedFile('An uploaded file.', UPLOAD_ERR_OK, 'myfile.txt', 'text/plain');
        $symfonyUploadedFile = $this->callCreateUploadedFile($uploadedFile);
        $size = $symfonyUploadedFile->getSize();

        $uniqid = uniqid();
        $symfonyUploadedFile->move($this->tmpDir, $uniqid);

        $this->assertEquals($uploadedFile->getSize(), $size);
        $this->assertEquals(UPLOAD_ERR_OK, $symfonyUploadedFile->getError());
        $this->assertEquals('myfile.txt', $symfonyUploadedFile->getClientOriginalName());
        $this->assertEquals('txt', $symfonyUploadedFile->getClientOriginalExtension());
        $this->assertEquals('text/plain', $symfonyUploadedFile->getClientMimeType());
        $this->assertEquals('An uploaded file.', file_get_contents($this->tmpDir.'/'.$uniqid));
    }

    /**
     * @expectedException        \Symfony\Component\HttpFoundation\File\Exception\FileException
     * @expectedExceptionMessage The file "e" could not be written on disk.
     */
    public function testCreateUploadedFileWithError()
    {
        $uploadedFile = $this->createUploadedFile('Error.', UPLOAD_ERR_CANT_WRITE, 'e', 'text/plain');
        $symfonyUploadedFile = $this->callCreateUploadedFile($uploadedFile);

        $this->assertEquals(UPLOAD_ERR_CANT_WRITE, $symfonyUploadedFile->getError());

        $symfonyUploadedFile->move($this->tmpDir, 'shouldFail.txt');
    }

    private function createUploadedFile($content, $error, $clientFileName, $clientMediaType)
    {
        $filePath = tempnam($this->tmpDir, uniqid());
        file_put_contents($filePath, $content);

        return new UploadedFile($filePath, filesize($filePath), $error, $clientFileName, $clientMediaType);
    }

    private function callCreateUploadedFile(UploadedFileInterface $uploadedFile)
    {
        $reflection = new \ReflectionClass($this->factory);
        $createUploadedFile = $reflection->getMethod('createUploadedFile');
        $createUploadedFile->setAccessible(true);

        return $createUploadedFile->invokeArgs($this->factory, array($uploadedFile));
    }

    public function testCreateResponse()
    {
        $response = new Response(
            '1.0',
            array(
                'X-Symfony' => array('2.8'),
                'Set-Cookie' => array(
                    'theme=light',
                    'test',
                    'ABC=AeD; Domain=dunglas.fr; Path=/kevin; Expires=Wed, 13 Jan 2021 22:23:01 GMT; Secure; HttpOnly; SameSite=Strict',
                ),
            ),
            new Stream('The response body'),
            200
        );

        $symfonyResponse = $this->factory->createResponse($response);

        $this->assertEquals('1.0', $symfonyResponse->getProtocolVersion());
        $this->assertEquals('2.8', $symfonyResponse->headers->get('X-Symfony'));

        $cookies = $symfonyResponse->headers->getCookies();
        $this->assertEquals('theme', $cookies[0]->getName());
        $this->assertEquals('light', $cookies[0]->getValue());
        $this->assertEquals(0, $cookies[0]->getExpiresTime());
        $this->assertNull($cookies[0]->getDomain());
        $this->assertEquals('/', $cookies[0]->getPath());
        $this->assertFalse($cookies[0]->isSecure());
        $this->assertFalse($cookies[0]->isHttpOnly());

        $this->assertEquals('test', $cookies[1]->getName());
        $this->assertNull($cookies[1]->getValue());

        $this->assertEquals('ABC', $cookies[2]->getName());
        $this->assertEquals('AeD', $cookies[2]->getValue());
        $this->assertEquals(strtotime('Wed, 13 Jan 2021 22:23:01 GMT'), $cookies[2]->getExpiresTime());
        $this->assertEquals('dunglas.fr', $cookies[2]->getDomain());
        $this->assertEquals('/kevin', $cookies[2]->getPath());
        $this->assertTrue($cookies[2]->isSecure());
        $this->assertTrue($cookies[2]->isHttpOnly());
        if (defined('Symfony\Component\HttpFoundation\Cookie::SAMESITE_STRICT')) {
            $this->assertEquals(Cookie::SAMESITE_STRICT, $cookies[2]->getSameSite());
        }

        $this->assertEquals('The response body', $symfonyResponse->getContent());
        $this->assertEquals(200, $symfonyResponse->getStatusCode());
    }
}
