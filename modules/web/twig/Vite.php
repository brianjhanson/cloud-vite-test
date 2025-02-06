<?php

namespace modules\web\twig;

use Craft;
use craft\helpers\App;
use modules\services\Twig;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;
use Twig\TwigFunction;
use Twig\TwigTest;

/**
 * Twig extension
 */
class Vite extends AbstractExtension
{
    public function getFilters()
    {
        // Define custom Twig filters
        // (see https://twig.symfony.com/doc/3.x/advanced.html#filters)
        return [];
    }

    public function getFunctions()
    {
        // Define custom Twig functions
        // (see https://twig.symfony.com/doc/3.x/advanced.html#functions)
        return [
            new TwigFunction('viteIncludes', function (string $path) {
                $client = Craft::createGuzzleClient();
                $response = $client->get(
                    App::parseEnv('@artifactBaseUrl/dist/' . $path)
                );
                $body = (string) $response->getBody();
                return Craft::$app->getView()->renderString($body);
            }),
        ];
    }

    public function getTests()
    {
        // Define custom Twig tests
        // (see https://twig.symfony.com/doc/3.x/advanced.html#tests)
        return [];
    }
}
