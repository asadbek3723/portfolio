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
  // Anything that is not an in-app path (other schemes, protocol-relative URLs, #hash, ?query) is a plain anchor.
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#|\?)/i.test(to)) {
    const external = /^(https?:)?\/\//i.test(to);
    const rel = rest.target === "_blank" || external ? [rest.rel, "noopener", "noreferrer"].filter(Boolean).join(" ") : rest.rel;
    return <a ref={ref} href={to} {...rest} {...(rel ? { rel } : {})} />;
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
