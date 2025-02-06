<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 */

use craft\helpers\App;
use craft\config\GeneralConfig;

$isDev = App::env('CRAFT_ENVIRONMENT') === 'dev';
$isProd = App::env('CRAFT_ENVIRONMENT') === 'production';

return GeneralConfig::create()
    // Aliases
    ->aliases([
        '@assetPath' => App::env('PRIMARY_SITE_URL') . '/assets',
        '@webroot' => CRAFT_BASE_PATH . '/web',
    ])

    // Fuzzy Search
    ->defaultSearchTermOptions([
        'subLeft' => false,
        'subRight' => true,
    ])

    // Images
    ->defaultImageQuality(90)
    ->maxUploadFileSize('10M')

    // Assets
    ->extraFileKinds([
        'svg' => [
            'label' => 'SVG',
            'extensions' => ['svg'],
        ],
        'image' => [
            'label' => 'Image',
            'extensions' => ['jpg', 'jpeg'],
        ],
        'video' => [
            'label' => 'Video',
            'extensions' => ['mp4'],
        ],
    ])

    // Misc
    ->allowUpdates($isDev)
    ->allowAdminChanges($isDev)
    ->maxRevisions(10)
    ->enableGql(false)

    // URLs
    ->omitScriptNameInUrls(true)

    // Caching
    ->maxCachedCloudImageSize(0)

    // Security
    ->coolDownDuration('PT5M')
    ->invalidLoginWindowDuration('PT1H')
    ->userSessionDuration(3600)
    ->sendPoweredByHeader(false);
