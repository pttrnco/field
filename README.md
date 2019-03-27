# Field

A Statamic fieldtype that gives you the ability to select `Fieldset › Field` in the control panel. Ideal for addons that will need to integrate with a user's current architecture.

## Installation

Unzip and place the `Field` directory in your `site/addons` directory. Then run `php please update:addons`.

## Usage

Field will store the fieldset and field information in this format: `fieldset|field`

You can optionally use `Statamic\Addons\Field\FieldTrait` to have access to `getFieldField()` and `getFieldFieldset()` which may make it easier to work with your Field fields.
