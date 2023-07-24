import { UserProps } from '@/services/requests/user/types';

export type DashboardHeaderProps = {
  user: UserProps;
  hideShadow?: boolean;
}