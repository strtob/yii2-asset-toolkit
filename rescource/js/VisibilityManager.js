/**
 * VisibilityManagerAsset - An asset bundle for the VisibilityManager functionality in Yii2.
 *
 * This asset bundle includes the necessary JavaScript file for managing the visibility of form elements
 * or their parent columns based on dynamic user input, such as dropdown selections. It includes a custom JavaScript file (`VisibilityManagerAsset.js`)
 * to handle the visibility rules, which can be customized to show or hide form elements or their parent columns based on the selected value
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
 * const visibilityManager = new VisibilityManager({
 *     rules: rules,
 *     considerCols: true  // Apply visibility to parent columns (if set to false, visibility is applied to form elements directly)
 * });
 *
 * In this example, when the dropdown with ID `#dropdown-id` changes:
 * - If the selected value is `1`, `#field-to-hide` will be hidden, and `#field-to-show` will be shown.
 * - If the selected value is `2`, the visibility is reversed for the fields.
 * - The `default` rule applies when no specific value is selected.
 * 
 * The `considerCols` option allows you to decide whether the visibility is applied to the form element itself or its parent column. 
 * - If `considerCols` is set to `true`, visibility will apply to the parent column (`.col-*`), hiding or showing the entire column.
 * - If `considerCols` is set to `false` (default), visibility will apply only to the form element itself.
 * 
 * @package strtob\yii2AssetToolkit
 */
