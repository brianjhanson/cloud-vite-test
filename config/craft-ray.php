<?php
// Save this in a file called "craft-ray.php" in the config directory of your project

use craft\helpers\App;

return [
    'enable' => App::parseBooleanEnv('$CRAFT_DEV_MODE'),
    'host' => 'host.docker.internal',
    'port' => 23517,
];
