import style from './style.module.css';

interface WorkTypeFormProps {
  newWorkType: { type: string; max: number };
  setNewWorkType: (value: { type: string; max: number }) => void;
  onAddWorkType: () => void;
}

const WorkTypeForm = ({ newWorkType, setNewWorkType, onAddWorkType }: WorkTypeFormProps) => {
  return (
    <div className={style.container}>
      <div className={style.workTypes}>
        <select
          value={newWorkType.type}
          onChange={(e) => setNewWorkType({ ...newWorkType, type: e.target.value })}
        >
          <option value="">Выберите тип работы</option>
          <option value="Устный ответ">Устный ответ</option>
          <option value="Самостоятельная работа">Самостоятельная работа</option>
          <option value="Ответ у доски">Ответ у доски</option>
        </select>
        <input
          type="number"
          min="1"
          value={newWorkType.max}
          onChange={(e) => setNewWorkType({ ...newWorkType, max: +e.target.value })}
        />
        <button onClick={onAddWorkType}>Добавить работу</button>
      </div>
    </div>
  );
};

export default WorkTypeForm;