import React, { useState, useEffect } from 'react';
import { ref, get, set } from 'firebase/database';
import { database } from './firebase';

const PokerTracker = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [players, setPlayers] = useState([]);
  const [dates, setDates] = useState([]);
  const [scores, setScores] = useState({});
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newDate, setNewDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [editingCell, setEditingCell] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [showAddDate, setShowAddDate] = useState(false);

  const ADMIN_PASSWORD = 'poker2025'; // Cambia esto por tu contraseña preferida

  // Cargar datos de Firebase
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Cargar jugadores
      const playersRef = ref(database, 'players');
      const playersSnapshot = await get(playersRef);
      if (playersSnapshot.exists()) {
        setPlayers(playersSnapshot.val());
      } else {
        // Datos iniciales
        const initialPlayers = [
          'Shava', 'Coke', 'Boro', 'Xavy', 'Zavala', 'Pibe', 'Pino', 'Pepe', 'Barto'
        ];
        setPlayers(initialPlayers);
        await set(playersRef, initialPlayers);
      }

      // Cargar fechas
      const datesRef = ref(database, 'dates');
      const datesSnapshot = await get(datesRef);
      if (datesSnapshot.exists()) {
        setDates(datesSnapshot.val());
      } else {
        const initialDates = [
          { date: '05/02/2025', games: ['Juego 1', 'Juego 2'] },
          { date: '12/02/2025', games: ['Juego 1', 'Juego 2'] },
          { date: '19/02/2025', games: ['Juego 1', 'Juego 2'] },
          { date: '26/02/2025', games: ['Juego 1', 'Juego 2'] }
        ];
        setDates(initialDates);
        await set(datesRef, initialDates);
      }

      // Cargar puntuaciones
      const scoresRef = ref(database, 'scores');
      const scoresSnapshot = await get(scoresRef);
      if (scoresSnapshot.exists()) {
        setScores(scoresSnapshot.val());
      } else {
        const initialScores = {
          'Shava-05/02/2025-Juego 1-pts': 1, 'Shava-05/02/2025-Juego 1-elim': 0,
          'Shava-05/02/2025-Juego 2-pts': 1, 'Shava-05/02/2025-Juego 2-elim': 0,
          'Coke-05/02/2025-Juego 1-pts': 0, 'Coke-05/02/2025-Juego 1-elim': 2,
          'Coke-05/02/2025-Juego 2-pts': 0, 'Coke-05/02/2025-Juego 2-elim': 2,
          'Boro-05/02/2025-Juego 1-pts': 3, 'Boro-05/02/2025-Juego 1-elim': 0,
          'Boro-05/02/2025-Juego 2-pts': 3, 'Boro-05/02/2025-Juego 2-elim': 0,
          'Xavy-05/02/2025-Juego 1-pts': 0, 'Xavy-05/02/2025-Juego 1-elim': 0,
          'Xavy-05/02/2025-Juego 2-pts': 0, 'Xavy-05/02/2025-Juego 2-elim': 0,
          'Zavala-05/02/2025-Juego 1-pts': 0, 'Zavala-05/02/2025-Juego 1-elim': 3,
          'Zavala-05/02/2025-Juego 2-pts': 0, 'Zavala-05/02/2025-Juego 2-elim': 0,
          'Pibe-05/02/2025-Juego 1-pts': 0, 'Pibe-05/02/2025-Juego 1-elim': 0,
          'Pibe-05/02/2025-Juego 2-pts': 0, 'Pibe-05/02/2025-Juego 2-elim': 0,
          'Pino-05/02/2025-Juego 1-pts': 6, 'Pino-05/02/2025-Juego 1-elim': 0,
          'Pino-05/02/2025-Juego 2-pts': 0, 'Pino-05/02/2025-Juego 2-elim': 6,
          'Pepe-05/02/2025-Juego 1-pts': 0, 'Pepe-05/02/2025-Juego 1-elim': 0,
          'Pepe-05/02/2025-Juego 2-pts': 0, 'Pepe-05/02/2025-Juego 2-elim': 0,
          'Barto-05/02/2025-Juego 1-pts': 0, 'Barto-05/02/2025-Juego 1-elim': 0,
          'Barto-05/02/2025-Juego 2-pts': 0, 'Barto-05/02/2025-Juego 2-elim': 0,
          'Pibe-12/02/2025-Juego 1-pts': 0, 'Pibe-12/02/2025-Juego 1-elim': 10,
          'Pibe-12/02/2025-Juego 2-pts': 0, 'Pibe-12/02/2025-Juego 2-elim': 0,
          'Barto-12/02/2025-Juego 1-pts': 8, 'Barto-12/02/2025-Juego 1-elim': 4,
          'Barto-12/02/2025-Juego 2-pts': 5, 'Barto-12/02/2025-Juego 2-elim': 0,
          'Pibe-19/02/2025-Juego 1-pts': 10, 'Pibe-19/02/2025-Juego 1-elim': 0,
          'Pibe-19/02/2025-Juego 2-pts': 0, 'Pibe-19/02/2025-Juego 2-elim': 0,
          'Xavy-19/02/2025-Juego 1-pts': 0, 'Xavy-19/02/2025-Juego 1-elim': 0,
          'Xavy-19/02/2025-Juego 2-pts': 10, 'Xavy-19/02/2025-Juego 2-elim': 2,
          'Barto-26/02/2025-Juego 1-pts': 10, 'Barto-26/02/2025-Juego 1-elim': 0,
          'Barto-26/02/2025-Juego 2-pts': 10, 'Barto-26/02/2025-Juego 2-elim': 0,
          'Xavy-26/02/2025-Juego 1-pts': 10, 'Xavy-26/02/2025-Juego 1-elim': 2,
          'Xavy-26/02/2025-Juego 2-pts': 10, 'Xavy-26/02/2025-Juego 2-elim': 0,
          'Pibe-26/02/2025-Juego 1-pts': 0, 'Pibe-26/02/2025-Juego 1-elim': 0,
          'Pibe-26/02/2025-Juego 2-pts': 0, 'Pibe-26/02/2025-Juego 2-elim': 5
        };
        setScores(initialScores);
        await set(scoresRef, initialScores);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error al cargar datos. Verifica tu conexión.');
    }
    setIsLoading(false);
  };

  const saveScores = async (newScores) => {
    try {
      const scoresRef = ref(database, 'scores');
      await set(scoresRef, newScores);
    } catch (error) {
      console.error('Error saving scores:', error);
      alert('Error al guardar puntuaciones');
    }
  };

  const savePlayers = async (newPlayers) => {
    try {
      const playersRef = ref(database, 'players');
      await set(playersRef, newPlayers);
    } catch (error) {
      console.error('Error saving players:', error);
      alert('Error al guardar jugadores');
    }
  };

  const saveDates = async (newDates) => {
    try {
      const datesRef = ref(database, 'dates');
      await set(datesRef, newDates);
    } catch (error) {
      console.error('Error saving dates:', error);
      alert('Error al guardar fechas');
    }
  };

  const calculateTotal = (player) => {
    let total = 0;
    dates.forEach(dateObj => {
      dateObj.games.forEach(game => {
        const ptsKey = `${player}-${dateObj.date}-${game}-pts`;
        const elimKey = `${player}-${dateObj.date}-${game}-elim`;
        total += (scores[ptsKey] || 0) + (scores[elimKey] || 0);
      });
    });
    return total;
  };

  const getSortedPlayers = () => {
    return [...players].sort((a, b) => calculateTotal(b) - calculateTotal(a));
  };

  const handleCellClick = (player, date, game, type) => {
    if (!isAuthenticated) return;
    const key = `${player}-${date}-${game}-${type}`;
    setEditingCell(key);
    setTempValue((scores[key] || 0).toString());
  };

  const handleCellBlur = async () => {
    if (editingCell) {
      const newScores = { ...scores };
      newScores[editingCell] = parseInt(tempValue) || 0;
      setScores(newScores);
      await saveScores(newScores);
      setEditingCell(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    }
  };

  const addPlayer = async () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      const updatedPlayers = [...players, newPlayerName.trim()];
      setPlayers(updatedPlayers);
      await savePlayers(updatedPlayers);
      setNewPlayerName('');
      setShowAddPlayer(false);
    }
  };

  const addDate = async () => {
    if (newDate.trim()) {
      const updatedDates = [...dates, { date: newDate.trim(), games: ['Juego 1', 'Juego 2'] }];
      setDates(updatedDates);
      await saveDates(updatedDates);
      setNewDate('');
      setShowAddDate(false);
    }
  };

  const removePlayer = async (playerToRemove) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${playerToRemove}?`)) {
      const updatedPlayers = players.filter(p => p !== playerToRemove);
      setPlayers(updatedPlayers);
      await savePlayers(updatedPlayers);
    }
  };

  const removeDate = async (dateToRemove) => {
    if (window.confirm(`¿Estás seguro de eliminar la fecha ${dateToRemove}?`)) {
      const updatedDates = dates.filter(d => d.date !== dateToRemove);
      setDates(updatedDates);
      await saveDates(updatedDates);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">🂡 🂱 🃁 🃑 Cargando datos...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full border-4 border-yellow-600">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">🂡 🂱 🃁 🃑</div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">Poker Tracker</h1>
            <p className="text-gray-300">Tabla de Puntuaciones</p>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Contraseña de Administrador:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && password === ADMIN_PASSWORD && setIsAuthenticated(true)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-yellow-600 focus:outline-none focus:border-yellow-400"
              placeholder="Ingresa la contraseña"
            />
          </div>
          
          <button
            onClick={() => password === ADMIN_PASSWORD && setIsAuthenticated(true)}
            className="w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded transition duration-200"
          >
            🔓 Acceder como Admin
          </button>
          
          <p className="text-center text-gray-400 mt-4 text-sm">
            La tabla es visible para todos. Solo el admin puede editar.
          </p>
        </div>
      </div>
    );
  }

  const sortedPlayers = getSortedPlayers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 rounded-lg shadow-2xl p-6 mb-6 border-4 border-yellow-600">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🂡 🂱 🃁 🃑</span>
              <div>
                <h1 className="text-3xl font-bold text-yellow-400">Poker Tracker</h1>
                <p className="text-gray-300">Sistema de Puntuaciones</p>
              </div>
            </div>
            
            {isAuthenticated && (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setShowAddPlayer(true)}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold transition duration-200"
                >
                  ➕ Jugador
                </button>
                <button
                  onClick={() => setShowAddDate(true)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold transition duration-200"
                >
                  📅 Fecha
                </button>
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded font-bold transition duration-200"
                >
                  🔒 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Add Player Modal */}
        {showAddPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full border-2 border-yellow-600">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Agregar Nuevo Jugador</h3>
              <input
                type="text"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPlayer()}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-yellow-600 mb-4"
                placeholder="Nombre del jugador"
              />
              <div className="flex gap-2">
                <button
                  onClick={addPlayer}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 rounded font-bold"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowAddPlayer(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-bold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Date Modal */}
        {showAddDate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-2xl max-w-md w-full border-2 border-yellow-600">
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Agregar Nueva Fecha</h3>
              <input
                type="text"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addDate()}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-yellow-600 mb-4"
                placeholder="DD/MM/YYYY"
              />
              <div className="flex gap-2">
                <button
                  onClick={addDate}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-bold"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowAddDate(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-bold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Table */}
        <div className="bg-gray-800 rounded-lg shadow-2xl overflow-x-auto border-4 border-yellow-600">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-yellow-700 to-yellow-600">
              <tr>
                <th className="px-3 py-3 text-left text-gray-900 font-bold border-r-2 border-yellow-800">Pos</th>
                <th className="px-3 py-3 text-left text-gray-900 font-bold border-r-2 border-yellow-800">Jugador</th>
                {dates.map((dateObj, idx) => (
                  <th key={idx} colSpan={dateObj.games.length * 2} className="px-3 py-2 text-center text-gray-900 font-bold border-r-2 border-yellow-800">
                    <div className="flex items-center justify-center gap-2">
                      {dateObj.date}
                      {isAuthenticated && (
                        <button
                          onClick={() => removeDate(dateObj.date)}
                          className="text-red-900 hover:text-red-700 text-xs"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  </th>
                ))}
                <th className="px-3 py-3 text-center text-gray-900 font-bold bg-yellow-500">Total Pts</th>
              </tr>
              <tr className="bg-yellow-600">
                <th colSpan={2} className="border-r-2 border-yellow-800"></th>
                {dates.map((dateObj, dateIdx) =>
                  dateObj.games.map((game, gameIdx) => (
                    <React.Fragment key={`${dateIdx}-${gameIdx}`}>
                      <th className="px-2 py-2 text-center text-gray-900 text-xs font-bold border-r border-yellow-800">
                        {game}<br/>Pts
                      </th>
                      <th className="px-2 py-2 text-center text-gray-900 text-xs font-bold border-r-2 border-yellow-800">
                        Pts.<br/>Elim.
                      </th>
                    </React.Fragment>
                  ))
                )}
                <th className="bg-yellow-500"></th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((player, idx) => {
                const total = calculateTotal(player);
                return (
                  <tr key={player} className={idx % 2 === 0 ? 'bg-green-900 bg-opacity-30' : 'bg-green-800 bg-opacity-20'}>
                    <td className="px-3 py-2 text-yellow-400 font-bold border-r-2 border-gray-700">{idx + 1}</td>
                    <td className="px-3 py-2 text-white font-semibold border-r-2 border-gray-700">
                      <div className="flex items-center justify-between">
                        {player}
                        {isAuthenticated && (
                          <button
                            onClick={() => removePlayer(player)}
                            className="text-red-400 hover:text-red-300 text-xs ml-2"
                          >
                            ❌
                          </button>
                        )}
                      </div>
                    </td>
                    {dates.map((dateObj, dateIdx) =>
                      dateObj.games.map((game, gameIdx) => {
                        const ptsKey = `${player}-${dateObj.date}-${game}-pts`;
                        const elimKey = `${player}-${dateObj.date}-${game}-elim`;
                        return (
                          <React.Fragment key={`${dateIdx}-${gameIdx}`}>
                            <td
                              className={`px-2 py-2 text-center text-white border-r border-gray-700 ${
                                isAuthenticated ? 'cursor-pointer hover:bg-green-700' : ''
                              }`}
                              onClick={() => handleCellClick(player, dateObj.date, game, 'pts')}
                            >
                              {editingCell === ptsKey ? (
                                <input
                                  type="number"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyPress={handleKeyPress}
                                  autoFocus
                                  className="w-full bg-yellow-600 text-gray-900 text-center rounded px-1 py-1 font-bold"
                                />
                              ) : (
                                scores[ptsKey] || 0
                              )}
                            </td>
                            <td
                              className={`px-2 py-2 text-center text-white border-r-2 border-gray-700 ${
                                isAuthenticated ? 'cursor-pointer hover:bg-green-700' : ''
                              }`}
                              onClick={() => handleCellClick(player, dateObj.date, game, 'elim')}
                            >
                              {editingCell === elimKey ? (
                                <input
                                  type="number"
                                  value={tempValue}
                                  onChange={(e) => setTempValue(e.target.value)}
                                  onBlur={handleCellBlur}
                                  onKeyPress={handleKeyPress}
                                  autoFocus
                                  className="w-full bg-yellow-600 text-gray-900 text-center rounded px-1 py-1 font-bold"
                                />
                              ) : (
                                scores[elimKey] || 0
                              )}
                            </td>
                          </React.Fragment>
                        );
                      })
                    )}
                    <td className="px-3 py-2 text-center text-yellow-400 font-bold text-lg bg-gray-900 bg-opacity-50">
                      {total}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>🂡 🂱 🃁 🃑 Poker Tracker - Sistema de Puntuaciones Permanente 🂡 🂱 🃁 🃑</p>
          <p className="mt-2">
            {isAuthenticated ? '🔓 Modo Administrador - Puedes editar' : '👁️ Modo Solo Lectura'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokerTracker;