import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import UserStatusWrapper, { DropDown } from './UserStatus.style';
import { withUserContext } from '../HOC/User';

class UserStatus extends Component {
  static propTypes = {
    status: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  };

  userStatusWrapperRef = React.createRef();

  constructor({ status }) {
    super();
    this.state = {
      isOpen: false,
      showDropdown: false,
      statusOptions: ['Available', 'Not Ready', 'Unavailable'],
      avalibleStatus: ['Not Ready', 'Unavailable'],
      currentStatus: status,
      loadingStatus: null,
      percentage: 0,
    };
  }

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
    this.setState(
      { isOpen: false, loadingStatus: null, percentage: 100 },
      this.handleShowDropdownOut
    );
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
    const { loadingStatus } = this.state;
    if (loadingStatus === newStatus) return;

    if (this.completeUpdate) clearTimeout(this.completeUpdate);

    if (this.abortController && loadingStatus) this.abortController.abort();
    this.abortController = new AbortController();
    const { signal } = this.abortController;

    this.setState(
      {
        loadingStatus: newStatus,
        percentage: 35,
      },
      () => {
        this.percentageIncrease();

        fetch('http://localhost:3004/status', {
          method: 'post',
          signal,
        })
          .then(() => {
            const { statusOptions } = this.state;
            const avalibleStatus = [...statusOptions];
            const index = avalibleStatus.indexOf(newStatus);
            if (index > -1) {
              avalibleStatus.splice(index, 1);
            }
            this.setState(
              {
                percentage: 99,
              },
              () => {
                this.completeUpdate = setTimeout(() => {
                  this.setState({
                    avalibleStatus,
                    currentStatus: newStatus,
                  });
                  this.closeDropdown();
                }, 500);
              }
            );
          })
          .catch(err => {
            // eslint-disable-next-line no-debugger
            if (err.name !== 'AbortError') {
              console.error(` Err: ${err}`);
              alert('Error - Unable to update status.');
            }
          });
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
    const { avatar } = this.props;
    return (
      <Fragment>
        <UserStatusWrapper ref={this.userStatusWrapperRef}>
          <Avatar status={currentStatus} onClick={this.handleToggle} img={avatar} />
          {showDropdown && (
            <DropDown isOpen={isOpen}>
              {avalibleStatus.map(status => (
                <Avatar
                  key={status}
                  disabled={!isOpen}
                  hoverScale
                  status={status}
                  percentage={status === loadingStatus ? percentage : 0}
                  onClick={() => this.updateStatus(status)}
                  img={avatar}
                />
              ))}
            </DropDown>
          )}
        </UserStatusWrapper>
      </Fragment>
    );
  }
}

export default withUserContext(UserStatus);
