import QueryBuilder from '../../builder/QueryBuilder';
import { ExpeditionSearchableFields } from './expedition.constants';
import Expedition from './expedition.model';
import { TExpeditionInput } from './expedition.types';

const postExpedition = async (payload: TExpeditionInput) => {
  const expedition = await Expedition.create({
    ...payload,
    availableSeats: payload.totalSeats,
  });
  return expedition;
};

const getAllExpeditions = async (query: Record<string, unknown>) => {
  const expeditionModelQuery = new QueryBuilder(Expedition.find(), query)
    .search(ExpeditionSearchableFields)
    .filter()
    .fields()
    .sort()
    .paginate();

  const data = await expeditionModelQuery.modelQuery;
  const meta = await expeditionModelQuery.countTotal();
  return { data, meta };
};

const ExpeditionServices = { postExpedition, getAllExpeditions };
export default ExpeditionServices;
