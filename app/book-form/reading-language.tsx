import { Control } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { FormSchemaType } from './form-schema'

interface ReadingLanguageProps {
  control: Control<FormSchemaType>
}

export default function ReadingLanguage({ control }: ReadingLanguageProps) {
  return (
    <FormField
    control={control}
    name="language"
    render={({ field }) => (
      <FormItem className="space-y-2">
        <FormLabel className="text-sm text-gray-300">
          Reading language
        </FormLabel>
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue="Swedish"
          >
            <div className="flex items-center w-fit cursor-pointer space-x-2">
              <RadioGroupItem
                value="Swedish"
                id="Swedish"
              />
              <Label
                htmlFor="Swedish"
                className="cursor-pointer text-sm font-semibold"
              >
                Swedish
              </Label>
            </div>
            <div className="flex items-center w-fit cursor-pointer space-x-2">
              <RadioGroupItem
                value="English"
                id="English"
              />
              <Label
                htmlFor="English"
                className="cursor-pointer text-sm font-semibold"
              >
                English
              </Label>
            </div>
          </RadioGroup>
        </FormControl>
        <FormMessage className="text-red-400" />
      </FormItem>
    )}
  />
  )
}
