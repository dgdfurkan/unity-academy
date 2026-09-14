import { Children, cloneElement, isValidElement } from "react";
import type { HTMLAttributes, ReactElement } from "react";
import { cn } from "@/lib/utils";

/**
 * Tek çocuğuna kendi proplarını devreder. Bir bağlantıyı buton gibi
 * göstermek için kullanılır, fazladan sarmalayıcı eleman üretmez.
 */
export function Slot({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  const child = Children.only(children);

  if (!isValidElement<HTMLAttributes<HTMLElement>>(child)) return null;

  return cloneElement(child as ReactElement<HTMLAttributes<HTMLElement>>, {
    ...props,
    className: cn(className, child.props.className),
  });
}
