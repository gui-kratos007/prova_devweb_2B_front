import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Função para armazenar dados no AsyncStorage.
 * 
 * @param value O valor a ser armazenado.
 */
export const storeData = async (value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('my-key', value);
  } catch (error) {
    console.error("Erro ao salvar dados no storage:", error);
  }
};

/**
 * Função para recuperar dados do AsyncStorage.
 * 
 * @returns O valor armazenado ou null caso não exista.
 */
export const getData = async (): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem('my-key');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (error) {
    console.error("Erro ao recuperar dados do storage:", error);
    return null;
  }
};
