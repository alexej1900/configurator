import { gql } from '@apollo/client';

export const mainSettings = gql`
query MyQuery {
  entries {
    ... on rooms_default_Entry {
      title
    }
  }
  globalSets(handle: "settings") {
    ... on settings_GlobalSet {
      name
      settings {
        ... on settings_BlockType {
          brandLogo {
            url
            height
            width
          }
          headerBackgroundColor
          headerBackgroundPicture {
            url
            height
            width
          }
          welcomePageBg
          additionalBrandColor
          mainBrandColor
          colorSelected
          ctaSecondary
          fontForTitles
          fontForDescriptions
        }
      }
    }
  }
}`;

// export const mainSettings = gql`
// query MyQuery {
//   globalSets(handle: "settings") {
//     ... on settings_GlobalSet {
//       name
//       settings {
//         ... on settings_BlockType {
//           brandLogo {
//             url
//             height
//             width
//           }
//           headerBackgroundColor
//           headerBackgroundPicture {
//             url
//             height
//             width
//           }
//           welcomePageBg
//           additionalBrandColor
//           mainBrandColor
//           colorSelected
//           ctaSecondary
//           fontForTitles
//           fontForDescriptions
//         }
//       }
//     }
//   }
// }
// `;

export const introScreen = gql`
query MyQuery {
  globalSets(handle: "welcomeScreen") {
    ... on welcomeScreen_GlobalSet {
      handle
      welcomeScreen {
        ... on welcomeScreen_BlockType {
          bigApartmentPrice
          bigRoomTitle
          paragraph
          bigRoomImage {
            width
            url
            height
          }
          introText
          smallApartmentPrice
          smallRoomTitle
          smallRoomImage {
            height
            width
            url
          }
          apartmentType {
            ... on apartmentType_apartmentType_BlockType {
              apartmentPrice
              apartmentTitle
              apartmentImage {
                url
                width
                height
              }
              apartmentRooms {
                ... on apartmentRooms_BlockType {
                  roomType
                }
              }
            }
          }
        }
      }
    }
  }
}
`;


export const apartmentList = gql`
query MyQuery {
  globalSets(handle: "apartmentList") {
    ... on apartmentList_GlobalSet {
      id
      name
      apartmentList {
        ... on apartmentList_BlockType {
          id
          apartmentId
          areaBath
          areaBath2
          areaCorridor
          areaGeneral
          areaKitchen
          areaKitchenFurniture
          basePrice
          apartmentImage {
            url
            width
            height
          }
        }
      }
    }
  }
}
`;





export const apartmentItem = gql`
query MyQuery($id: [QueryArgument]) {
  globalSets(handle: "apartmentList") {
    ... on apartmentList_GlobalSet {
      apartmentList(orderBy: "apartmentId", id: $id) {
        id
        apartmentId
        areaBath
        areaBath2
        areaCorridor
        areaGeneral
        areaKitchen
        areaKitchenFurniture
        basePrice
        apartmentImage {
          height
          width
          url
        }
      }
    }
  }
}
`;


export const typePage = gql `
query TypePage {
  entry(slug: "type") {
    ... on pages_default_Entry {
      styles {
        ... on styles_BlockType {
          styleTitle
          description
          image {
            url
            height
            width
          }
        }
      }
    }
  }
}`;

export const RoomData = (slug) => {
  return gql`
  query RoomData {
    entry(slug: "${slug}") {
      ... on rooms_default_Entry {
        title
        roomStyles {
          ... on roomStyles_BlockType {
            roomStyleExamples {
              ... on roomStyleExamples_styleBlock_BlockType {
                styleName
                styleDefaultImage {
                  url
                  height
                  width
                }
              }
            }
          }
        }
        mods {
          ... on mods_BlockType {
            modificationsTypes {
              ... on modificationsTypes_modificationExample_BlockType {
                modificationName
                modificationDescription
                modificationMainStyle
                modificationItemExample {
                  ... on modificationItemExample_BlockType {
                    modificationTitle
                    modificationStyle
                    modificationDescr
                    modificationImage {
                      url
                      width
                      height
                    }
                    recommendedModification
                    modsAdditionalPrice
                    mainStyle
                    setDisabling {
                      disableIf
                      value
                    }
                  }
                }
                modificationPin {
                  ... on modificationPin_BlockType {
                    positionX
                    positionY
                  }
                }
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    individualSolutionPrice
                    enableIndividualSolution
                  }
                }
                optionsList {
                  optionsPrice
                  optionsSubtitle
                  optionsTitle
                }
              }
              ... on modificationsTypes_modificationGroup_BlockType {
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    enableIndividualSolution
                    individualSolutionPrice
                  }
                }
                modificationGroupBlock {
                  ... on modificationGroupBlock_BlockType {
                    modGroupName
                    modificationExamples {
                      ... on modificationExamples_modificationExamplesBlock_BlockType {
                        modificationImage {
                          height
                          url
                          width
                        }
                        modificationStyle
                        modificationTitle
                        modificationDescr
                        recommendedModification
                      }
                    }
                    optionsList {
                      optionsPrice
                      optionsSubtitle
                      optionsTitle
                    }
                    modsAdditionalPrice
                  }
                }
                modificationName
                modificationDescription
                modificationPin {
                  ... on modificationPin_BlockType {
                    positionX
                    positionY
                  }
                }
              }
            }
          }
        }
      }
    }
  } `
};

export const roomImages = gql`
query MyQuery {
  assets {
    ... on uploads_Asset {
      url
      height
      width
      title
    }
  }
}`;

export const bathImages = gql`
query MyQuery {
  assets {
    ... on bathImages_Asset {
      url
      title
    }
  }
}`;

export const saveData = gql`
mutation save_users_default_Entry($resultName: String, $userEmail: String, $userPhone: String, $userData: String, $authorId: ID) {
  save_users_default_Entry(
      title: $resultName, 
      userEmail: $userEmail, 
      userPhone: $userPhone, 
      userData: $userData,
      authorId: $authorId,
    ) {
    userEmail
    userPhone
    userData
    title
  }
}`;
