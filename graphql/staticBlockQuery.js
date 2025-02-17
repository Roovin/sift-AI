import { gql } from '@apollo/client';

export const GET_STATIC_BLOCK= gql`
query getStaticBlock($id: Int){
  blockBy(blockId: $id) {
    blocksection {
      sections {
        ... on Block_Blocksection_Sections_ViolatorBar {
          body
          fieldGroupName
          hideViolatorBar
        }
      }
    }
  }
}
  `;