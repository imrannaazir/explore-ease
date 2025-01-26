import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import Booking from '../booking/booking.model';
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

const getSingleExpedition = async (id: string) => {
  const expedition = await Expedition.findById(id);
  if (!expedition?.id) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Expedition not founded.');
  }
  return expedition;
};

export const getPopularDestinations = async (
  query: Record<string, unknown>,
) => {
  const limit = Number(query.limit) || 5;

  const popularDestinations = await Booking.aggregate([
    {
      $lookup: {
        from: 'expeditions',
        localField: 'expeditionId',
        foreignField: '_id',
        as: 'expedition',
      },
    },
    { $unwind: '$expedition' },
    {
      $group: {
        _id: '$expedition.destination',
        bookings: { $sum: 1 },
        totalRevenue: { $sum: '$expedition.price' },
      },
    },
    { $sort: { bookings: -1 } },
    { $limit: limit },
  ]);

  return popularDestinations;
};

const ExpeditionServices = {
  postExpedition,
  getAllExpeditions,
  getSingleExpedition,
  getPopularDestinations,
};
export default ExpeditionServices;
