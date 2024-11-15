import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchBoards,
  fetchBoardById,
  addBoard,
  updateBoard,
  deleteBoard,
} from '../../redux/boards/operations';
import { selectBoards } from '../../redux/boards/selectors';
import LogoComponent from '../LogoComponent/LogoComponent';
import Modal from '../Modal/Modal';
import CreateBoardForm from '../CreateBoardForm/CreateBoardForm';
import EditBoardForm from '../EditBoardForm/EditBoardForm';
import s from './SideBar.module.css';
import sprite from '../../icons/icons.svg';
import NeedHelp from './NeedHelp/NeedHelp';
import Logout from './Logout/Logout';
import { selectUserId } from '../../redux/user/selectors';
import {
  closeSidebar,
  selectIsSidebarOpen,
  toggleSidebar,
} from '../../redux/sidebarSlice/slice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1440);
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  const userId = useSelector(selectUserId);
  const token = localStorage.getItem('token');

  console.log(userId, token);

  useEffect(() => {
    console.log('User ID:', userId, 'Token:', token);
    if (userId && token) {
      dispatch(fetchBoards({ userId, token }));
    }
  }, [dispatch, userId, token]);

  const boards = useSelector(selectBoards) || [];
  console.log('Boards from Redux:', boards);
  const [selectedBoard, setSelectedBoard] = useState(null);

  const handleCreateBoard = newBoard => {
    console.log('Creating new board:', newBoard);
    // dispatch(addBoard({ userId, boardName: newBoard.title, token }));
    // setCreateModalOpen(false);
  };

  const handleDeleteBoard = boardId => {
    dispatch(deleteBoard({ boardId, token }));
  };

  const handleEditBoardClick = board => {
    console.log('Selected board for editing:', board);
    setSelectedBoard(board);
    console.log(selectedBoard);
    setEditModalOpen(true);
  };

  const handleEditBoard = updatedBoard => {
    console.log('Updated board data:', updatedBoard);
    dispatch(
      updateBoard({
        boardId: updatedBoard._id,
        editedBoardObject: updatedBoard.editedBoardObject,
        token,
      })
    );
    setEditModalOpen(false);
  };
  const handleBoardClick = board => {
    dispatch(fetchBoardById({ boardId: board._id, token }));
    // navigate(`/boards/${board._id}`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1440);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOverlayClick = () => {
    if (!isDesktop) dispatch(closeSidebar());
  };

  return (
    <>
      {isSidebarOpen && !isDesktop && (
        <div className={s.modalOverlay} onClick={handleOverlayClick}></div>
      )}

      <div
        className={`${s.sidebarContainer} ${
          isSidebarOpen || isDesktop ? s.openSidebar : s.closedSidebar
        }`}
      >
        <div className={s.sidebar}>
          <LogoComponent />
          <h2 className={s.title}>My boards</h2>
          <hr className={s.separator} />

          <div className={s.createBoardContainer}>
            <div>
              <span className={s.createBoardText}>Create a new board</span>
            </div>
            <button
              className={s.createButton}
              onClick={() => setCreateModalOpen(true)}
            >
              <svg className={s.plusIcon} width="20" height="20">
                <use href={`${sprite}#plus-icon`} />
              </svg>
            </button>
          </div>

          <hr className={s.separator} />

          <div className={s.boardList}>
            {boards && boards.length > 0 ? (
              boards.map(board => (
                <div
                  key={board._id}
                  className={s.boardItem}
                  onClick={() => handleBoardClick(board)}
                >
                  <div className={s.projecContainer}>
                    <svg className={s.projectIcon} width="18" height="18">
                      <use href={`${sprite}#${board.icon}`} />
                    </svg>

                    <span className={s.boardTitles}>{board.title}</span>
                  </div>
                  <div className={s.actions}>
                    <button
                      className={s.editButton}
                      onClick={() => handleEditBoardClick(board)}
                    >
                      <svg className={s.iconAction} width="16" height="16">
                        <use href={`${sprite}#pencil-icon`} />
                      </svg>
                    </button>
                    <button
                      className={s.deleteButton}
                      onClick={() => handleDeleteBoard(board._id)}
                    >
                      <svg className={s.iconAction} width="16" height="16">
                        <use href={`${sprite}#trash-icon`} />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={s.noBoards}>No boards available</p>
            )}
          </div>

          {isCreateModalOpen && (
            <CreateBoardForm onCreate={handleCreateBoard} board={selectedBoard} closeModal={() => setCreateModalOpen(false)}
            />
          )}

          {isEditModalOpen && (
            <EditBoardForm board={selectedBoard} onSave={handleEditBoard} closeModal={() => setEditModalOpen(false)}/>
          )}
        </div>

        <button
          className={s.toggleButton}
          onClick={() => dispatch(toggleSidebar())}
        >
          <svg className={s.toggleIcon} width="20" height="20">
            <use href={`${sprite}#menu-icon`} />
          </svg>
        </button>
        <div className={s.need}>
          <NeedHelp />
        </div>
        <div className={s.out}>
          <Logout />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
