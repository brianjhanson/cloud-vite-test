<?php

use craft\helpers\App;

/**
 * Configuration file for Imager
 *
 * Multi-environment settings work in this file the same way as in general.php or db.php
 */

return [
    'transformer' => App::env('IMAGER_TRANSFORMER') ?: 'craft',
    'allowUpscale' => true,
    'fillTransforms' => true,
    'fillInterval' => 400,
    'useForCpThumbs' => true,

    //'imgixApiKey' => App::env('IMGIX_API_KEY'),
    //
    //'imgixConfig' => [
    //    'default' => [
    //        'domain' => App::env('IMGIX_DOMAIN'),
    //        'useHttps' => true,
    //        'signKey' => App::env('IMGIX_SIGN_KEY'),
    //        'useCloudSourcePath' => true,
    //        'sourceIsWebProxy' => false,
    //        'getExternalImageDimensions' => false,
    //    ]
    //]
];
