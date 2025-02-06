<?php
/**
 * @copyright Copyright (c) PutYourLightsOn
 */

/**
 * Blitz config.php
 *
 * This file exists only as a template for the Blitz settings.
 * It does nothing on its own.
 *
 * Don't edit this file, instead copy it to 'craft/config' as 'blitz.php'
 * and make your changes there to override default settings.
 *
 * Once copied to 'craft/config', this file will be multi-environment aware as
 * well, so you can have different settings groups for each environment, just as
 * you do for 'general.php'
 */

return [
    '*' => [
        // With this setting enabled, Blitz will log detailed messages to `storage/logs/blitz.log`.
        'debug' => false,

        // With this setting enabled, Blitz will begin caching pages according to the included/excluded URI patterns. Disable this setting to prevent Blitz from caching any new pages.
        'cachingEnabled' => filter_var(
            getenv('CRAFT_TEMPLATE_CACHING'),
            FILTER_VALIDATE_BOOLEAN
        ),

        // The URI patterns to include in caching. Set `siteId` to a blank string to indicate all sites.
        'includedUriPatterns' => [
            [
                'siteId' => '',
                'uriPattern' => '',
            ],
            [
                'siteId' => '',
                'uriPattern' => '.*',
            ],
        ],

        // The URI patterns to exclude from caching (overrides any matching patterns to include). Set `siteId` to a blank string to indicate all sites.
        'excludedUriPatterns' => [],

        // The generator settings.
        'cacheGeneratorSettings' => ['concurrency' => 3],

        // Whether URLs with query strings should be cached and how.
        // - `0`: Do not cache URLs with query strings
        // - `1`: Cache URLs with query strings as unique pages
        // - `2`: Cache URLs with query strings as the same page
        'queryStringCaching' => 0,

        // The query string parameters to include when determining if and how a page should be cached (regular expressions may be used).
        'includedQueryStringParams' => [],

        // Whether an `X-Powered-By: Blitz` header should be sent.
        'sendPoweredByHeader' => false,
    ],
];
