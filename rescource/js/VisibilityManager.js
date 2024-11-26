/**
 * VisibilityManager - A class that manages the visibility of form elements 
 * based on the selected value of a dropdown.
 *
 * Usage Example:
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
 *                 value: 'default',      // Default behavior when no specific value matches
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
 */
class VisibilityManager {
    /**
     * Constructor that initializes the VisibilityManager with visibility rules.
     * @param {Array} rules - The list of visibility rules to be applied.
     */
    constructor(rules) {
        this.rules = rules;
        this.init();  // Initialize event listeners and initial visibility.
    }

    /**
     * Initializes event listeners for each rule and applies visibility logic.
     */
    init() {
        this.rules.forEach((ruleConfig) => {
            const eventElement = document.querySelector(ruleConfig.eventElement);

            // Check if the element exists on the page
            if (!eventElement) {
                console.warn(`Element ${ruleConfig.eventElement} not found.`);
                return;
            }

            // Add event listener for the specified event type (e.g., 'change')
            eventElement.addEventListener(ruleConfig.eventType, () => {
                this.applyVisibility(ruleConfig, eventElement.value);
            });

            // Apply visibility based on the initial value of the dropdown
            this.applyVisibility(ruleConfig, eventElement.value);
        });
    }

    /**
     * Applies visibility rules based on the dropdown value.
     * @param {Object} config - The rule configuration for the dropdown.
     * @param {string} value - The selected value from the dropdown.
     */
    applyVisibility(config, value) {
        // Find the matching rule for the current value or use the default rule
        const rule = config.rules.find(r => r.value === value) || config.rules.find(r => r.value === 'default');
        
        // If no rule is found, exit early
        if (!rule) return;

        // Apply actions defined in the rule (show or hide elements)
        rule.actions.forEach(action => {
            const element = document.querySelector(action.element);
            
            if (!element) {
                console.warn(`Element ${action.element} not found.`);
                return;
            }

            // Perform the show or hide action
            if (action.action === 'hide') {
                element.style.display = 'none';
            } else if (action.action === 'show') {
                element.style.display = '';
            }
        });
    }
}
