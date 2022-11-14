import { useQuery } from '@apollo/client';
import { mainSettings } from '../../gql/index';

export default async function getSettings() {

  const settings = await useQuery(mainSettings).data?.globalSets[0].settings[0];

  return settings;
}
