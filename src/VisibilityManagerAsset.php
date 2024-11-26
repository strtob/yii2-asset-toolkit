<?php

namespace strtob\yii2AssetToolkit;

use yii\web\AssetBundle;

/**
 * VisibilityManagerAsset - An asset bundle for the VisibilityManager functionality in Yii2.
 *
 * This asset bundle includes the necessary JavaScript file for managing the visibility of form elements
 * based on dynamic user input, such as dropdown selections. It includes a custom JavaScript file (`VisibilityManagerAsset.js`)
 * to handle the visibility rules, which can be customized to show or hide form elements based on the selected value
 * of a dropdown or other event-driven triggers.
 *
 * Usage Example:
 *
 * To use the VisibilityManager functionality, include this asset bundle in your Yii2 view as follows:
 * 
 * ```php
 * VisibilityManagerAsset::register($this);
 * ```
 * 
 * Once the asset is registered, you can define your visibility rules for form elements dynamically
 * based on the values selected in dropdowns or other events.
 *
 * Example of usage in JavaScript:
 *
 * const rules = [
 *     {
 *         eventElement: '#dropdown-id',  // The ID of the dropdown element
 *         eventType: 'change',           // The event type to listen for
 *         rules: [
 *             {
 *                 value: '1',           // The value of the dropdown to trigger this rule
 *                 actions: [            // List of actions to apply when the rule is triggered
 *                     { element: '#field-to-hide', action: 'hide' },
 *                     { element: '#field-to-show', action: 'show' }
 *                 ]
 *             },
 *             {
 *                 value: '2',           // Another dropdown value
 *                 actions: [
 *                     { element: '#field-to-hide', action: 'show' },
 *                     { element: '#field-to-show', action: 'hide' }
 *                 ]
 *             },
 *             {
 *                 value: 'default',      // Default behavior when no specific value is selected
 *                 actions: [
 *                     { element: '#field-to-hide', action: 'show' },
 *                     { element: '#field-to-show', action: 'show' }
 *                 ]
 *             }
 *         ]
 *     }
 * ];
 *
 * const visibilityManager = new VisibilityManager(rules);
 *
 * In this example, when the dropdown with ID `#dropdown-id` changes:
 * - If the selected value is `1`, `#field-to-hide` will be hidden, and `#field-to-show` will be shown.
 * - If the selected value is `2`, the visibility is reversed for the fields.
 * - The `default` rule applies when no specific value is selected.
 * 
 * @package strtob\yii2AssetToolkit
 */
class VisibilityManagerAsset extends AssetBundle
{
    /**
     * @var string The source path for the asset files.
     * This path is relative to the application's `@vendor` alias and points to the location of the
     * asset files for the Visibility Manager (JavaScript files).
     */
    public $sourcePath = '@vendor/strtob/yii2-asset-toolkit/rescource/'; // Adjust path if necessary

    /**
     * @var array List of JavaScript files to be included in the asset bundle.
     * This includes the custom JavaScript file `VisibilityManagerAsset.js` for visibility management.
     */
    public $js = [      
        'js/VisibilityManagerAsset.js',
    ];

    /**
     * @var array List of asset bundles that this bundle depends on.
     * In this case, it depends on the Yii2 core YiiAsset bundle.
     */
    public $depends = [
        'yii\web\YiiAsset',
    ];
}
