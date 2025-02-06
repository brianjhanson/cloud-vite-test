<?php

namespace modules\services;

use craft\elements\Entry;
use yii\base\Component;
use craft\elements\Asset;

/**
 * Twig service
 *
 */
class Twig extends Component
{
    /**
     * Returns a string containing all of the modifier classes applied.
     *
     * {{ craft.twig.modifiers('my-base-class', ['large']) }}
     *
     */
    public function modifiers(string $baseClass, array $modifiers = []): string
    {
        $classes = '';

        foreach ($modifiers as $mod) {
            // Filter out empty modifiers
            if (strlen($mod) > 0) {
                // Concatenate the base class with the modifier
                $classes .= $baseClass . '--' . $mod . ' ';
            }
        }

        // Trim any trailing space for clean output
        return trim($classes);
    }

    /**
     * Returns whether an image asset can be safely transformed
     *
     * {{ craft.twig.isAssetTransformable(myAsset) }}
     *
     * @param Asset $asset
     * @return bool
     */
    public function isAssetTransformable(Asset $asset): bool
    {
        return $asset->extension ?? null and
            !in_array($asset->extension, ['gif', 'svg']);
    }

    /**
     * Returns an array of modifier classes for a given matrix block
     *
     * {{ craft.twig.blockClasses() }}
     *
     * @param string $handle
     * @param array|Entry $block
     * @param array|Entry|null $previousBlock
     * @param array|Entry|null $nextBlock
     * @return array
     */
    public function blockClasses(
        string $handle,
        array|Entry $block,
        array|Entry $previousBlock = null,
        array|Entry $nextBlock = null
    ): array {
        $classes = [];

        // All Spacing
        if (!in_array($handle, [])) {
            // Top Spacing
            if (!in_array($handle, [])) {
                array_push($classes, 'space-top');
            }

            // Bottom Spacing
            if (!in_array($handle, [])) {
                array_push($classes, 'space-bottom');
            }
        } else {
            array_push($classes, 'bleed-top', 'bleed-bottom');
        }

        // Bleed / Top
        if (in_array($handle, [])) {
            array_push($classes, 'bleed-top');
        }

        // Bleed / Bottom
        if (in_array($handle, [])) {
            array_push($classes, 'bleed-bottom');
        }

        // Bleed Mobile (no top/bottom spacing on mobile)
        if (in_array($handle, [])) {
            array_push($classes, 'bleed-top-mobile', 'bleed-bottom-mobile');
        }

        // Overflow Hidden
        if (in_array($handle, [])) {
            array_push($classes, 'overflow-hidden');
        }

        // Max
        if (!in_array($handle, [])) {
            array_push($classes, 'max');
        }

        // Borders
        $borderedBlocks = [];
        if (
            in_array($handle, $borderedBlocks) and
            in_array($nextBlock['handle'] ?? null, $borderedBlocks)
        ) {
            array_push($classes, 'border-bottom', 'bleed-bottom');
        }
        if (
            in_array($handle, $borderedBlocks) and
            in_array($previousBlock['handle'] ?? null, $borderedBlocks)
        ) {
            array_push($classes, 'border-top', 'bleed-top');
        }

        // Background Color
        $blockColor = $block['color'] ?? null;
        $isLightBg = $blockColor === null || $blockColor;
        if (in_array($handle, []) || !$isLightBg) {
            array_push($classes, 'bg-dark');
        } else {
            array_push($classes, 'bg-light');
        }

        return $classes;
    }

    /**
     * Converts any string into a dash-separated version
     *
     * {{ craft.twig.dasherize('My custom text') }}
     *
     * @param string $string
     * @return string
     */
    public function dasherize(string $string): string
    {
        // Step 1: Replace camel case with spaces + lowercase letter
        $string = preg_replace('/([a-z])([A-Z])/', '$1 $2', $string);

        // Step 2: Lowercase the entire string
        $string = strtolower($string);

        // Step 3: Replace any non-letter and non-digit characters with a dash
        $string = preg_replace('/[^a-z0-9]+/', '-', $string);

        // Step 4: Trim dashes from the beginning and end of the string
        $string = trim($string, '-');

        return $string;
    }

    /**
     * Returns an array of attributes for a dialog toggle
     *
     * {{ attr(craft.twig.dialogToggleAttr('my-unique-key')) }}
     *
     * @param string $key
     * @return string[]
     */
    public function dialogToggleAttr(string $key): array
    {
        return [
            'data-a11y-dialog-show' => $key,
            'data-module-dialog-toggle' => $key,
        ];
    }
}
