import axios from 'axios';

export const useFetchData = async () => {
  try {
    const res = await axios.get('http://localhost:3003/users/');
    return res.data.map((item: any) => item.userName);
  } catch (error) {
    console.log(error);
  }
};
