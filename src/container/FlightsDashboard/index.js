import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import classNames from 'classnames';

import { uiService } from '../../services/ui';
import Pagination from '../../components/Pagination';
import Limit from '../../components/Limit';
import { ViewType } from '../../components/ViewType';
import { Flights } from '../../components/Flights';

import AppStyles from '../../App.module.css';
import Layout from '../../Layout.module.css';

export const FlightDashboard = ({ flightData, pages }) => {
  const { controls } = useStore(uiService.$);

  useEffect(() => {
    return () => uiService.resetControls();
  }, []);

  const limitHandler = (limit, index) => {
    uiService.setControls({
      limit,
      limitId: index,
      page: 1
    });
  };

  const paginationHandler = operator => {
    const page =
      operator === 'increment'
        ? Math.min(controls.page + 1, pages)
        : Math.max(controls.page - 1, 1);

    uiService.setControls({ page });
  };

  return (
    <>
      {flightData && (
        <section
          className={classNames(
            Layout['flex-row'],
            Layout['flex-mobile-column'],
            Layout['horizontal-centre'],
            AppStyles['controls']
          )}
        >
          <Limit onClickHandler={limitHandler} />
          <Pagination
            page={controls.page}
            pages={pages}
            onClickHandler={paginationHandler}
          />
          <ViewType
            selectedId={controls.responseType}
            onClickHandler={responseType =>
              uiService.setControls({ responseType })
            }
          />
        </section>
      )}
      <Flights results={flightData} display={controls.responseType} />
    </>
  );
};
