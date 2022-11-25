import { gql } from '@apollo/client';

export const headerSettings = gql`
query MyQuery {
  entries {
    ... on rooms_default_Entry {
      id
      title
    }
  }
}`;

export const mainSettings = gql`
query MyQuery {
  globalSets(handle: "settings") {
    ... on settings_GlobalSet {
      id
      name
      settings {
        ... on settings_BlockType {
          id
          brandLogo {
            url
          }
          headerBackgroundColor
          headerBackgroundPicture {
            url
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
}
`;

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
              id
              apartmentPrice
              apartmentTitle
              apartmentImage {
                url
                width
                height
              }
              apartmentRooms {
                ... on apartmentRooms_BlockType {
                  id
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

export const typePage = gql `
query TypePage {
  entry(slug: "type") {
    ... on pages_default_Entry {
      styles {
        ... on styles_BlockType {
          styleTitle
          id
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
            id
            roomStyleExamples {
              ... on roomStyleExamples_styleBlock_BlockType {
                id
                styleName
                styleDefaultImage {
                  url
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
                    id
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
                  }
                }
                modificationPin {
                  ... on modificationPin_BlockType {
                    id
                    positionX
                    positionY
                  }
                }
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    id
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
                id
                modificationVisibility
                individualSolution {
                  ... on individualSolution_BlockType {
                    id
                    enableIndividualSolution
                    individualSolutionPrice
                  }
                }
                modificationGroupBlock {
                  ... on modificationGroupBlock_BlockType {
                    id
                    modGroupName
                    modificationExamples {
                      ... on modificationExamples_modificationExamplesBlock_BlockType {
                        id
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
                    id
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
      title
    }
  }
}`;

export const bathImages = gql`
query MyQuery {
  assets {
    ... on bathImages_Asset {
      id
      url
      title
    }
  }
}`;

export const kitchenImages = gql`
query MyQuery {
  assets {
    ... on kitchenImages_Asset {
      url
      title
    }
  }
}`;

export const livingRoomImages = gql`
query MyQuery {
  assets {
    ... on livingRoomImages_Asset {
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
