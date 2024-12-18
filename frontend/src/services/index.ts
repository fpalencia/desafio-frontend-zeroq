import apiOffices from "../api";
import { ResponseOfficesSchema } from "../schema";

export const getOffices = async () => {

  try {
    // Fetch Data
    const { data } = await apiOffices.get('/offices');

    // Validate Data
    const result = ResponseOfficesSchema.safeParse(data);

    // Return Data
    if (result.success) {
      return {
        succes: true,
        data: result.data
      }
    }
  } catch (error) {
    console.log(error);
  }
};