import { useQuery } from '@apollo/client';
import { headerSettings } from '../../gql/index';

export default async function getLinkWithoutTypeRoom() {
  const link = await useQuery(headerSettings).data?.entries[0].title?.toLowerCase();
  return link;
}