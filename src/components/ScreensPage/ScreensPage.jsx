import React, { useEffect } from 'react';
import s from './ScreensPage.module.css';
import FiltersDropDown from '../FiltersDropDown/FiltersDropDown';
import AddColumnModal from '../AddColumnModal/AddColumnModal';
import BoardColumn from '../BoardColumn/BoardColumn';
import sprite from '../../icons/icons.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectColumns,
  selectEditModalOpen,
  selectIsDeleteModalOpen,
  selectIsModalOpen,
  // selectIsError,
  selectIsLoading,
} from '../../redux/columns/selectors';
import { selectSelectedBoard } from '../../redux/boards/selectors';
import { fetchBoardById } from '../../redux/boards/operations';
// import { closeModal, openModal } from '../../redux/boards/slice';
import EditColumnModal from '../EditColumnModal/EditColumnModal';
import DeleteColumnModal from '../DeleteColumnModal/DeleteColumnModal';
import { fetchColumns, addColumn } from '../../redux/columns/operations';
import { openModal, closeModal } from '../../redux/columns/slice';
const ScreensPage = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEditModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isLoading = useSelector(selectIsLoading);
  // const isError = useSelector(selectIsError);
  const token = localStorage.getItem('token');
  // useEffect(() => {
  //   dispatch(fetchColumns());
  // }, [dispatch]);
  useEffect(() => {
    console.log('Selected board ID:', selectedBoard?._id);
    if (selectedBoard?._id) {
      dispatch(fetchColumns(selectedBoard._id));
    }
  }, [dispatch, selectedBoard?._id]);
  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };
  const handleAddColumn = async columnTitle => {
    await dispatch(
      addColumn({ boardId: selectedBoard._id, title: columnTitle, token })
    );
    console.log('Selected board ID:', selectedBoard._id);
    dispatch(fetchColumns(selectedBoard._id));
    handleCloseModal();
  };
  // const handleAddColumn = async columnTitle => {
  //   await dispatch(addColumn(columnTitle));
  //   handleCloseModal();
  // };

  // useEffect(() => {
  //   if (selectedBoard) {
  //     dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
  //   }
  // }, [dispatch, selectedBoard, token]);
  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard?._id, token]);
  useEffect(() => {
    console.log('Selected board:', selectedBoard);
  }, [selectedBoard]);
  // console.log('Selected board title:', selectedBoard.title);

  useEffect(() => {
    console.log('Columns in selected board:', columns);
  }, [columns]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  // if (isError) {
  //   return <p>{toString(isError)}</p>;
  // }

  return selectedBoard ? (
    <div className={s.mainDashboard}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p className={s.boardTitle}>{selectedBoard.title}</p>
          <FiltersDropDown />
        </div>
        <div className={s.columnsContainer}>
          {selectedBoard.columns && selectedBoard.columns.length > 0 ? (
            selectedBoard.columns.map(column => (
              <BoardColumn key={column._id} column={column} />
            ))
          ) : (
            <p>No columns available for this board</p>
          )}
          <button className={s.addColumnBtn} onClick={handleOpenModal}>
            <svg className={s.plusIcon} width="24" height="24">
              <use href={`${sprite}#plus-icon`} />
            </svg>
            Add another column
          </button>
        </div>
      </div>
      {isModalOpen && (
        <AddColumnModal
          onClose={handleCloseModal}
          onAddColumn={handleAddColumn}
        />
      )}
      {isEditModalOpen && <EditColumnModal />}
      {isDeleteModalOpen && <DeleteColumnModal />}
    </div>
  ) : (
    <p>Select a board to view its details</p>
  );
};

export default ScreensPage;
