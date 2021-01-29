import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ButtonBase, styled } from "@material-ui/core";

import { ImageShadow } from "../menu-components/menu.styled";

export const LoaderWrapper = ({ Loader, loading, children }) => {
  return <>{loading ? Loader : children}</>;
};

LoaderWrapper.propTypes = {
  Loader: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

const CloseIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  top: 0;
  margin: 20px;
`;

export const FocusShadow = ({ active, setActive, children }) => {
  if (active) {
    return (
      <ImageShadow onClick={() => setActive(false)}>
        <CloseIcon color="white" icon={faTimes} />
        {children}
      </ImageShadow>
    );
  }
  return <></>;
};

FocusShadow.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
