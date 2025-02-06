<?php

return [
    'showLabel' => filter_var(
        getenv('CRAFT_ENV_LABEL'),
        FILTER_VALIDATE_REGEXP,
        [
            'options' => ['regexp' => '/.*/'],
        ]
    ),
    'labelText' => getenv('CRAFT_ENV_LABEL'),
    'prefix' => null,
    'suffix' => null,
    'labelColor' => getenv('CRAFT_ENV_COLOR'),
    'textColor' => '#ffffff',
];
