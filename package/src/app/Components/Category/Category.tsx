import { useState, useCallback } from 'react';
import { CategoryEntity, CategoryProps } from './Category.interface';

const Category = ({
  isRoot = false,
  onDelete,
  leftDivider = false,
  rightDivider = false,
  midDivider = false,
}: CategoryProps) => {
  const [children, updateChildren] = useState<CategoryEntity[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Category');
  const [inputValue, setInputValue] = useState<string>('');

  const renderBasicAction: boolean = !isRoot && !isEdit;
  const isMultipleChildren: boolean = children.length > 1;

  const onAdd = () => {
    const newChild: CategoryEntity = { id: new Date().getMilliseconds() };
    updateChildren((children) => [...children, newChild]);
  };

  const handleDelete = useCallback(
    (id: number) => () => {
      updateChildren((children) => children.filter((child) => child.id !== id));
    },
    []
  );

  const toggleEdit = () => {
    setIsEdit(true);
  };

  const cancelEdit = () => setIsEdit(false);

  const applyEdit = () => {
    setTitle(inputValue);
    cancelEdit();
  };

  const renderTitle = (): string | JSX.Element => {
    return isEdit ? (
      <input
        className="catergorie-input"
        type="text"
        placeholder="Categorie Name"
        autoFocus
        value={inputValue}
        onChange={({ target }) => setInputValue(target.value)}
      />
    ) : (
      title
    );
  };

  const renderActions = (): (false | JSX.Element)[] => {
    return [
      !isEdit && (
        <span
          key="add"
          className="categorie-action categorie-add"
          onClick={onAdd}
        >
          +
        </span>
      ),
      renderBasicAction && (
        <span
          key="edit"
          className="categorie-action categorie-edit"
          onClick={toggleEdit}
        >
          /
        </span>
      ),
      renderBasicAction && (
        <span
          key="delete"
          className="categorie-action categorie-delete"
          onClick={onDelete}
        >
          x
        </span>
      ),
      isEdit && (
        <span
          key="cancel"
          className="categorie-action categorie-cancel"
          onClick={cancelEdit}
        >
          x
        </span>
      ),
      isEdit && (
        <span
          key="apply"
          className="categorie-action categorie-apply"
          onClick={applyEdit}
        >
          v
        </span>
      ),
    ];
  };

  return (
    <div
      className={
        'categorie ' +
        (!isRoot ? 'categorie-sub ' : '') +
        (leftDivider ? 'categorie-sub-leftDivider ' : '') +
        (rightDivider ? 'categorie-sub-rightDivider ' : '') +
        (midDivider ? 'categorie-sub-midDivider' : '')
      }
    >
      <div
        className={
          'categorie-wrapper ' + (isRoot ? 'categorie-wrapper-root' : '')
        }
      >
        <div
          className={
            'categorie-card ' +
            (isRoot ? '' : 'categorie-card-sub ') +
            (isMultipleChildren ? 'categorie-card-multiple ' : '')
          }
        >
          {renderTitle()}
        </div>
        {renderActions()}
      </div>
      {!!children.length && (
        <div
          className={
            'subcategories ' +
            (isMultipleChildren ? 'subcategories-multiple' : '')
          }
        >
          {children.map((child, index, arr) => (
            <div key={child.id}>
              <Category
                onDelete={handleDelete(child.id)}
                leftDivider={isMultipleChildren && index === arr.length - 1}
                rightDivider={isMultipleChildren && index === 0}
                midDivider={
                  isMultipleChildren && index !== 0 && index !== arr.length - 1
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Category };
