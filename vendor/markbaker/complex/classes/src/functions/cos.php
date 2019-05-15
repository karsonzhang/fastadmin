<?php

/**
 *
 * Function code for the complex cos() function
 *
 * @copyright  Copyright (c) 2013-2018 Mark Baker (https://github.com/MarkBaker/PHPComplex)
 * @license    https://opensource.org/licenses/MIT    MIT
 */
namespace Complex;

/**
 * Returns the cosine of a complex number.
 *
 * @param     Complex|mixed    $complex    Complex number or a numeric value.
 * @return    Complex          The cosine of the complex argument.
 * @throws    Exception        If argument isn't a valid real or complex number.
 */
function cos($complex)
{
    $complex = Complex::validateComplexArgument($complex);

    if ($complex->isReal()) {
        return new Complex(\cos($complex->getReal()));
    }

    return conjugate(
        new Complex(
            \cos($complex->getReal()) * \cosh($complex->getImaginary()),
            \sin($complex->getReal()) * \sinh($complex->getImaginary()),
            $complex->getSuffix()
        )
    );
}
