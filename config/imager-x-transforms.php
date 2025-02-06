<?php

/* ---------------------------------------------------------------------------------------------
 * Imager-X Transform Config
 * ---------------------------------------------------------------------------------------------
 * Define transforms used by Imager-X. These can be used in our templates by passing the transform
 * name to the `transform` parameter of our `image` macro.
 *
 * Read more: https://imager-x.spacecat.ninja/usage/named-transforms.html
 */

return [
    //
    // Base transform config
    //

    'base' => [
        'transforms' => [['width' => 400], ['width' => 3000]],
        'defaults' => [
            'ratio' => null,
            'auto' => 'format,compress',
        ],
    ],

    //
    // Named transform configs (typically extending base, but can be fully custom if needed)
    //

    'scale' => [
        'transforms' => 'base',
    ],

    '1x1' => [
        'transforms' => 'base',
        'defaults' => [
            'ratio' => 1,
        ],
    ],

    '1x1-small' => [
        'transforms' => [['width' => 400], ['width' => 1200]],
        'defaults' => [
            'ratio' => 1,
        ],
        'configOverrides' => [
            'fillInterval' => 200,
        ],
    ],

    '4x3' => [
        'transforms' => 'base',
        'defaults' => [
            'ratio' => 1.33333333,
        ],
    ],

    '16x9' => [
        'transforms' => 'base',
        'defaults' => [
            'ratio' => 1.77777778,
        ],
    ],
];
