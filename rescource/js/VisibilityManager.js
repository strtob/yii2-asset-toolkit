/**
 * VisibilityManager - A class that manages the visibility of form elements or their parent columns 
 * based on the selected value of a dropdown.
 *
 * @param {Object} config - Configuration options for visibility behavior.
 * @param {Array} config.rules - The list of visibility rules to be applied.
 * @param {boolean} [config.considerCols=false] - Whether to apply visibility to the parent column (`.col-*`) or just the form element itself.
 */
class VisibilityManager {
    constructor(config) {
        this.rules = config.rules;
        this.considerCols = config.considerCols || false;  // Option to hide/show the parent column instead of the element
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
                console.warn(`VisibilityManager: Element ${ruleConfig.eventElement} not found.`);
                return;
            }

            console.log(`VisibilityManager: Adding event listener for ${ruleConfig.eventType} on ${ruleConfig.eventElement}`);

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
        
        // If no rule is found, log and exit early
        if (!rule) {
            console.warn(`VisibilityManager: No matching rule found for value "${value}" in element ${config.eventElement}`);
            return;
        }

        console.log(`VisibilityManager: Applying actions for value "${value}" in ${config.eventElement}`);

        // Apply actions defined in the rule (show or hide parent columns or elements)
        rule.actions.forEach(action => {
            const element = document.querySelector(action.element);
            
            if (!element) {
                console.warn(`VisibilityManager: Element ${action.element} not found.`);
                return;
            }

            if (this.considerCols) {
                // Find the parent column (assuming the field is wrapped in a `.col-*` div)
                const parentCol = element.closest('.col-xxl-3, .col-md-3, .col-sm-12');  // Adjust this selector to your specific column classes

                // If the parent column is not found, exit
                if (!parentCol) {
                    console.warn(`VisibilityManager: Parent column for ${action.element} not found.`);
                    return;
                }

                // Perform the show or hide action on the parent column
                if (action.action === 'hide') {
                    console.log(`VisibilityManager: Hiding parent column for ${action.element}`);
                    parentCol.style.display = 'none';
                } else if (action.action === 'show') {
                    console.log(`VisibilityManager: Showing parent column for ${action.element}`);
                    parentCol.style.display = '';
                }
            } else {
                // Apply visibility directly to the form element
                if (action.action === 'hide') {
                    console.log(`VisibilityManager: Hiding element ${action.element}`);
                    element.style.display = 'none';
                } else if (action.action === 'show') {
                    console.log(`VisibilityManager: Showing element ${action.element}`);
                    element.style.display = '';
                }
            }
        });
    }
}
