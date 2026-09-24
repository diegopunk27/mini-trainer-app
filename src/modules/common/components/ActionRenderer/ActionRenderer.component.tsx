import { IconButton, Tooltip } from '@mui/material';
import { ElementType, MouseEventHandler } from 'react';

export interface ActionRendererProps {
  Icon: ElementType;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  tooltip?: string;
  id?: string;
}

export const ActionRenderer = (props: ActionRendererProps) => {
  const IconComponent = props.Icon;
  const button = (
    <IconButton id={props.id} size="small" onClick={props.onClick}>
      <IconComponent fontSize="small" />
    </IconButton>
  );

  return props.tooltip ? <Tooltip title={props.tooltip}>{button}</Tooltip> : button;
};
