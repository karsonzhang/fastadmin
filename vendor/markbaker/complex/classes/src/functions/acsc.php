<?php

/**
 *
 * Function code for the complex acsc() function
 *
 * @copyright  Copyright (c) 2013-2018 Mark Baker (https://github.com/MarkBaker/PHPComplex)
 * @license    https://opensource.org/licenses/MIT    MIT
 */
namespace Complex;

/**
 * Returns the inverse cosecant of a complex number.
 *
 * @param     Complex|mixed    $complex    Complex number or a numeric value.
 * @return    Complex          The inverse cosecant of the complex argument.
 * @throws    Exception        If argument isn't a valid real or complex number.
 * @throws    \InvalidArgumentException    If function would result in a division by zero
 */
function acsc($complex)
{
    $complex = Complex::validateComplexArgument($complex);

    if ($complex->getReal() == 0.0 && $complex->getImaginary() == 0.0) {
        return INF;
    }

    return asin(inverse($complex));
}
