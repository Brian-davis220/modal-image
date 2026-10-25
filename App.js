import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const IMAGES = [
  {
    id: '1',
    title: 'Mountain Lake',
    description: 'A calm lake surrounded by mountains at sunrise.',
    uri: 'https://picsum.photos/id/1018/1000/700',
  },
  {
    id: '2',
    title: 'Forest Road',
    description: 'A quiet road winding through a green forest.',
    uri: 'https://picsum.photos/id/1043/1000/700',
  },
  {
    id: '3',
    title: 'Ocean Waves',
    description: 'Waves rolling onto the shore on a cloudy day.',
    uri: 'https://picsum.photos/id/1011/1000/700',
  },
  {
    id: '4',
    title: 'City Lights',
    description: 'A city skyline lit up after sunset.',
    uri: 'https://picsum.photos/id/1067/1000/700',
  },
  {
    id: '5',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching into the distance.',
    uri: 'https://picsum.photos/id/1002/1000/700',
  },
  {
    id: '6',
    title: 'Expo Logo',
    description: 'A local image bundled with the app from the assets folder.',
    source: require('./assets/icon.png'),
  },
];

const getSource = (item) => item.source ?? { uri: item.uri };

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();

  const thumbSize = (width - 16 * 2 - 12) / 2;

  const openModal = (item) => {
    setLoading(true);
    setSelectedImage(item);
  };

  const closeModal = () => setSelectedImage(null);

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.card, { width: thumbSize }, pressed && styles.cardPressed]}
      onPress={() => openModal(item)}
    >
      <Image source={getSource(item)} style={[styles.thumb, { height: thumbSize }]} />
      <Text style={styles.cardTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Image Gallery</Text>
      <Text style={styles.subheader}>Tap an image to open it in a modal</Text>

      <FlatList
        data={IMAGES}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />

      <Modal
        visible={selectedImage !== null}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <View style={styles.backdrop}>
          <View style={styles.modalCard}>
            {selectedImage ? (
              <>
                <View style={styles.imageWrapper}>
                  <Image
                    source={getSource(selectedImage)}
                    style={styles.fullImage}
                    resizeMode="contain"
                    onLoadEnd={() => setLoading(false)}
                  />
                  {loading ? (
                    <ActivityIndicator size="large" color="#fff" style={styles.loader} />
                  ) : null}
                </View>
                <Text style={styles.modalTitle}>{selectedImage.title}</Text>
                <Text style={styles.modalDescription}>{selectedImage.description}</Text>
              </>
            ) : null}

            <Pressable
              style={({ pressed }) => [styles.closeButton, pressed && styles.closeButtonPressed]}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 16,
  },
  subheader: {
    fontSize: 15,
    color: '#6b7280',
    paddingHorizontal: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardPressed: {
    opacity: 0.7,
  },
  thumb: {
    width: '100%',
    backgroundColor: '#e5e7eb',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    padding: 8,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#1f2937',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 10 / 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  loader: {
    position: 'absolute',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  modalDescription: {
    fontSize: 15,
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 6,
  },
  closeButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  closeButtonPressed: {
    backgroundColor: '#1d4ed8',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
