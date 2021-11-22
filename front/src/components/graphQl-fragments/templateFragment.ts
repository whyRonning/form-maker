import { gql } from "@apollo/client";

export let templateFragment = gql`
  fragment template on TemplatesType {
    generalBackgroundColor
    formBackgroundColor
    titleColor
    descriptionColor
    formWidth
    formMarginTop
    buttHeight
    buttWidth
    textColor
    buttColor
    buttTextColor
    title
    labelsPosition
    numOfFields
    inputs {
      id
      name
      placeholder
      type
      width
      height
      fieldDescription
      descriptionPosition
    }
  }
`;
