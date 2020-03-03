import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Col } from "rsuite";
import { SVGIcon } from "rsuite/lib/@types/common";
import { IconNames } from "rsuite/lib/Icon";
import "./sidebarLink.css";

export default function SidebarLink({
  text,
  icon,
  onClick,
  to
}: SidebarLinkProps) {
  return (
    <div className="sidebar-link">
      <Link to={to || ""} onClick={e => onClick || null}>
        <div className="inner-text">
          <Icon className="icon" icon={icon} size="lg" />
          <span className="text"></span>{text}
        </div>
      </Link>
    </div>
  );
}
export type SidebarLinkProps = {
  text: string;
  icon: IconNames | SVGIcon;
  onClick?: Function;
  to?: string;
};
