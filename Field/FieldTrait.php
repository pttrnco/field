<?php

namespace Statamic\Addons\Field;

trait FieldTrait
{
    public function getFieldField($field)
    {
        if ($field) {
            if (strpos($field, '|')) {
                $fields = explode('|', $field);
                return $fields[1];
            } else {
                return $field;
            }
        } else {
            return null;
        }
    }

    public function getFieldFieldset($field)
    {
        if ($field) {
            if (strpos($field, '|')) {
                $fields = explode('|', $field);
                return $fields[0];
            } else {
                return $field;
            }
        } else {
            return null;
        }
    }
}
