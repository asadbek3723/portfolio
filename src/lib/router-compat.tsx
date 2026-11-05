// Thin adapter so ported portfolio components keep their simple string-based
// navigation API while running on TanStack Router.
import * as React from "react";
import {
  Link as TsLink,
  Navigate as TsNavigate,
  useParams as tsUseParams,
  useLocation as tsUseLocation,
} from "@tanstack/react-router";

type LinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  to: string;
  replace?: boolean;
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, ...rest },
  ref,
) {
  if (/^(https?:|mailto:|tel:)/.test(to)) {
    return <a ref={ref} href={to} {...rest} />;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TsLink ref={ref} to={to as any} {...(rest as any)} />;
});

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <TsNavigate to={to as any} {...(replace ? { replace: true } : {})} />;
}

export function useParams<T extends Record<string, string | undefined>>(): Partial<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tsUseParams as any)({ strict: false }) as Partial<T>;
}

export function useLocation() {
  return tsUseLocation();
}
