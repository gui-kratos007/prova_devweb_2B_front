import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundPage() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página Não Encontrada' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Oops! Esta página não existe.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Voltar para a página inicial</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
