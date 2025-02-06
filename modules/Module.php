<?php
namespace modules;

use Craft;
use craft\events\RegisterTemplateRootsEvent;
use craft\helpers\App;
use craft\web\twig\variables\CraftVariable;
use craft\web\View;
use modules\services\Twig;
use yii\base\Event;

/**
 * Site module
 *
 * @method static Module getInstance()
 * @property  Twig $twig
 */
class Module extends \yii\base\Module
{
    /**
     * Initializes the module.
     */
    public function init()
    {
        // Set a @modules alias pointed to the modules/ directory
        Craft::setAlias('@modules', __DIR__);

        // Set the controllerNamespace based on whether this is a console or web request
        if (Craft::$app->getRequest()->getIsConsoleRequest()) {
            $this->controllerNamespace = 'modules\\console\\controllers';
        } else {
            $this->controllerNamespace = 'modules\\controllers';
        }

        parent::init();

        // Defer most setup tasks until Craft is fully initialized
        Craft::$app->onInit(function () {
            $this->attachEventHandlers();
        });
    }
    private function attachEventHandlers(): void
    {
        // Services
        $this->setComponents([
            'twig' => Twig::class,
        ]);

        // Variables
        Event::on(CraftVariable::class, CraftVariable::EVENT_INIT, function (
            Event $e
        ) {
            /** @var CraftVariable $variable */
            $variable = $e->sender;

            // Attach a service
            $variable->set('twig', Twig::class);
        });

        Event::on(
            View::class,
            View::EVENT_REGISTER_SITE_TEMPLATE_ROOTS,
            function (RegisterTemplateRootsEvent $event) {
                $event->roots['_dist'] = App::parseEnv(
                    '@webroot/dist/templates'
                );
            }
        );
    }
}
