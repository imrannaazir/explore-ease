import Expedition from './expedition.model';
import { TExpeditionInput } from './expedition.types';

const postExpedition = async (payload: TExpeditionInput) => {
  const expedition = await Expedition.create({
    ...payload,
    availableSeats: payload.totalSeats,
  });
  return expedition;
};
const ExpeditionServices = { postExpedition };
export default ExpeditionServices;
