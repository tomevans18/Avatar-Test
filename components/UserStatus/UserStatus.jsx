import React, { Component, Fragment } from 'react';

import Avatar from '../Avatar';
import UserStatusWrapper, { DropDown } from './UserStatus.style';

class UserStatus extends Component {
  state = {
    isOpen: false,
    showDropdown: false,
    statusOptions: ['Available', 'Not Ready', 'Unavailable'],
    avalibleStatus: ['Not Ready', 'Unavailable'],
    currentStatus: 'Available',
    loadingStatus: null,
    percentage: 0,
  };

  userStatusWrapperRef = React.createRef();

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleToggle = () => {
    const { isOpen } = this.state;
    if (isOpen) {
      this.closeDropdown();
    } else {
      document.addEventListener('mousedown', this.handleClickOutside, false);
      this.setState(
        {
          showDropdown: true,
        },
        () => {
          this.setState({ isOpen: true });
        }
      );
    }
  };

  closeDropdown = () => {
    this.setState({ isOpen: false }, this.handleShowDropdownOut);
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  };

  handleShowDropdownOut = () => {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState({
        showDropdown: false,
      });
    }, 200);
  };

  handleClickOutside = e => {
    if (this.userStatusWrapperRef.current.contains(e.target)) return;
    this.closeDropdown();
  };

  percentageIncrease = () => {
    clearTimeout(this.percentageTimeout);
    this.percentageTimeout = setTimeout(() => {
      const { percentage } = this.state;
      if (percentage >= 85) return;
      const newPercentage = Math.random() * (percentage + 15 - (percentage + 5)) + (percentage + 5);
      this.setState({
        percentage: newPercentage,
      });
      this.percentageIncrease();
    }, 500);
  };

  updateStatus = async newStatus => {
    this.setState(
      {
        loadingStatus: newStatus,
        percentage: 35,
      },
      () => {
        this.percentageIncrease();

        // fetch

        setTimeout(() => {
          const { statusOptions } = this.state;
          const avalibleStatus = [...statusOptions];
          const index = avalibleStatus.indexOf(newStatus);
          if (index > -1) {
            avalibleStatus.splice(index, 1);
          }
          this.setState(
            {
              avalibleStatus,
              currentStatus: newStatus,
            },
            this.closeDropdown
          );
        }, 3000);
      }
    );
  };

  render() {
    const {
      isOpen,
      showDropdown,
      currentStatus,
      avalibleStatus,
      loadingStatus,
      percentage,
    } = this.state;
    return (
      <Fragment>
        <UserStatusWrapper ref={this.userStatusWrapperRef}>
          <Avatar
            status={currentStatus}
            onClick={this.handleToggle}
            img="https://pbs.twimg.com/profile_images/1066699912425934848/ak1-6yzy_400x400.jpg"
          />
          {showDropdown && (
            <DropDown isOpen={isOpen}>
              {avalibleStatus.map(status => (
                <Avatar
                  key={status}
                  hoverScale
                  status={status}
                  percentage={status === loadingStatus ? percentage : 0}
                  onClick={() => this.updateStatus(status)}
                  img="https://pbs.twimg.com/profile_images/1066699912425934848/ak1-6yzy_400x400.jpg"
                />
              ))}
            </DropDown>
          )}
        </UserStatusWrapper>
      </Fragment>
    );
  }
}

export default UserStatus;
