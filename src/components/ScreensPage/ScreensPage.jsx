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
import backgrounds from '../../bg/background/bgImages';
const ScreensPage = () => {
  const selectedBoard = useSelector(selectSelectedBoard);
  const dispatch = useDispatch();
  const columns = useSelector(selectColumns);
  const isModalOpen = useSelector(selectIsModalOpen);
  const isEditModalOpen = useSelector(selectEditModalOpen);
  const isDeleteModalOpen = useSelector(selectIsDeleteModalOpen);
  const isLoading = useSelector(selectIsLoading);
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
    dispatch(fetchBoardById({ boardId: selectedBoard._id, token })); // Оновлюємо дошку з новими колонками
    handleCloseModal();
  };

  useEffect(() => {
    if (selectedBoard?._id) {
      dispatch(fetchBoardById({ boardId: selectedBoard._id, token }));
    }
  }, [dispatch, selectedBoard?._id, token]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const background = backgrounds.find(bg => bg.id === Number(selectedBoard?.background));
  console.log(background);

  return selectedBoard ? (
    <div       className={s.mainDashboard}
    style={{
      backgroundImage: `url(${background?.desktop})`, 
    }}>
      <div className={s.container}>
        <div className={s.boardHeader}>
          <p className={s.boardTitle}>{selectedBoard.title}</p>
          <FiltersDropDown />
        </div>
        <div className={s.columnsContainer}>
          {columns && columns.length > 0 ? (
            columns.map(column => (
              <BoardColumn key={column._id} column={column} />
            ))
          ) : (
            <p></p>
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
    <div className={s.noBoard}>
    <p className={s.noBoardText}> Before starting your project, it is essential <span>to create a board</span> to visualize and track all the necessary tasks and milestones. This board serves as a powerful tool to organize the workflow and ensure effective collaboration among team members.</p>
    </div>
  );
};

export default ScreensPage;
