import { IUser } from "@types";
import axiosClient from "api";
import { AxiosResponse } from "axios";
import { queryKeys } from "constants/queryKeys";
import { useQuery, useQueryClient } from "react-query";
import { clearStoredUser, getStoredUser, setStoredUser } from "utils/common/userStorage";

async function getUser(
  user: IUser | null,
  signal: AbortSignal | undefined | any,
): Promise<IUser | null> {
  if (!user) return null;
  const { data }: AxiosResponse<{ user: IUser }> = await axiosClient.get(
    `/api/user/${user._id}`,
    {
      signal,
    },
  );
  return data.user;
}

interface UseUser {
  user: IUser | null;
  updateUser: (user: IUser) => void;
  clearUser: () => void;
}

export function useUser(): UseUser {
  const queryClient = useQueryClient();
  const { data: user }: any = useQuery(
    queryKeys.user,
    ({ signal }) => getUser(user, signal),
    {
      initialData: getStoredUser,
      onSuccess: (received: IUser | null) => {
        if (!received) clearStoredUser();
        else setStoredUser(received);
      },
    },
  );

  // meant to be called from useAuth
  function updateUser(newUser: IUser): void {
    queryClient.setQueryData(queryKeys.user, newUser);
  }

  // meant to be called from useAuth
  function clearUser() {
    queryClient.setQueryData(queryKeys.user, null);
    queryClient.removeQueries([queryKeys.user]);
  }

  return { user, updateUser, clearUser };
}