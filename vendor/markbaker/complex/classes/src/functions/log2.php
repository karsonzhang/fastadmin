<?php

/**
 *
 * Function code for the complex log2() function
 *
 * @copyright  Copyright (c) 2013-2018 Mark Baker (https://github.com/MarkBaker/PHPComplex)
 * @license    https://opensource.org/licenses/MIT    MIT
 */
namespace Complex;

/**
 * Returns the base-2 logarithm of a complex number.
 *
 * @param     Complex|mixed    $complex    Complex number or a numeric value.
 * @return    Complex          The base-2 logarithm of the complex argument.
 * @throws    Exception        If argument isn't a valid real or complex number.
 * @throws    \InvalidArgumentException  If the real and the imaginary parts are both zero
 */
function log2($complex)
{
    $complex = Complex::validateComplexArgument($complex);

    if (($complex->getReal() == 0.0) && ($complex->getImaginary() == 0.0)) {
        throw new \InvalidArgumentException();
    } elseif (($complex->getReal() > 0.0) && ($complex->getImaginary() == 0.0)) {
        return new Complex(\log($complex->getReal(), 2), 0.0, $complex->getSuffix());
    }

    return ln($complex)
        ->multiply(\log(Complex::EULER, 2));
}
