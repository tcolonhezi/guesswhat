import styles from "./App.module.css";

import { WORDS, type Challenge } from "./utils/words";
import { useEffect, useState } from "react";
import { useSession } from "./hooks/useSession";
import { createAPISession } from "./services/session";
import { Game } from "./components/game/game";
import { ThemeScreen } from "./components/themeScreen/themeScreen";
import { getAPIChallenge } from "./services/challenge";
import { getThemes, type ThemesApiResponse } from "./services/themes";
import { isAxiosError } from "axios";
import { Messages } from "./components/messages/messages";

function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [restartGame, setRestartGame] = useState(false);

  const [theme, setTheme] = useState<string | null>(null);
  const [themes, setThemes] = useState<ThemesApiResponse>();
  const [isOffLine, setIsOffLine] = useState(true);
  const session = useSession();
  const [isGeneratingChallenge, setIsGeneratingChallenge] = useState(false);

  async function createSession() {
    try {
      const response = await createAPISession();
      const createdSession = response;
      session.saveSession(createdSession);
      setIsOffLine(false);
    } catch (error) {
      console.log("Erro ao iniciar sessão. Continuando em modo Offline.");
      setIsOffLine(true);
    }
  }

  async function getApiThemes() {
    try {
      const response = await getThemes();

      setThemes(response);

      setIsOffLine(false);
    } catch (error) {
      console.log("Erro ao carregar temas. Continuando em modo Offline.");
      setIsOffLine(true);
    }
  }

  function handleChangeTheme() {
    setTheme("");
  }

  async function createChallenge() {
    setIsGeneratingChallenge(true);
    try {
      if (!isOffLine && theme && session.session) {
        const response = await getAPIChallenge({
          sessionId: session.session.sessionId,
          theme,
        });
        setChallenge({
          id: Math.random(),
          word: response.word,
          tip: response.tip,
        });
        return;
      }
      createOfflineChallenge();
    } catch (error) {
      console.log("Erro ao criar desafio:", error);
      if (isAxiosError(error)) {
        if (error.status === 404) {
          createSession();
        }
      }
      setIsOffLine(true);
      createOfflineChallenge();
    } finally {
      setIsGeneratingChallenge(false);
    }
  }

  function createOfflineChallenge() {
    const index = Math.floor(Math.random() * WORDS.length);
    setChallenge({
      id: WORDS[index].id,
      tip: WORDS[index].tip,
      word: WORDS[index].word.toLocaleLowerCase(),
    });
  }

  useEffect(() => {
    createChallenge();
    getApiThemes();
    setRestartGame(false);
  }, [restartGame, theme]);

  useEffect(() => {
    if (!session.isLoading && !session.session) {
      createSession();
    }
  }, [session.isLoading, session.session]);

  if (!theme && themes) {
    return (
      <ThemeScreen
        themes={themes.themes}
        onSelect={(themeSelected) => setTheme(themeSelected)}
      />
    );
  }
  if (isGeneratingChallenge) {
    return (
      <Messages>
        <h2>Gerando desafio com a inteligência artificial...</h2>
      </Messages>
    );
  }

  if (!challenge)
    return (
      <Messages>
        <h2>Carregando modo offline...</h2>
      </Messages>
    );

  return (
    <div className={styles.container}>
      <main>
        <Game
          handleChangeTheme={handleChangeTheme}
          key={challenge.id}
          challenge={challenge}
          setRestartGame={setRestartGame}
          isOffline={isOffLine}
        />
      </main>
      {isOffLine && <h4>Jogando em modo offline. O tema será programação.</h4>}
    </div>
  );
}

export default App;
