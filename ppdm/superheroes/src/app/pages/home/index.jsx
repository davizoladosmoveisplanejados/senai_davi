import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';

export default function Home() {
    const { width } = useWindowDimensions();
    // 3 colunas no PC (largura >= 900px), 2 no tablet (600px - 899px), 1 no celular (< 600px)
    const numColumns = width >= 900 ? 3 : width >= 600 ? 2 : 1;

    const [herois, setHerois] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [busca, setBusca] = useState('');
    const [errosFoto, setErrosFoto] = useState({});

    const carregaHeroes = async () => {
        try {
            setCarregando(true);
            setErro(null);

            const response = await fetch('https://superheroes-api-one.vercel.app/api/herois');
            if (!response.ok) {
                throw new Error('Falha ao conectar ao Quartel-General');
            }

            const data = await response.json();
            const lista = Array.isArray(data) ? data : data?.herois || [];
            setHerois(lista);
        } catch (e) {
            setErro(e.message || 'Erro inesperado');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        carregaHeroes();
    }, []);

    // Filtro de heróis por nome ou habilidade
    const heroisFiltrados = useMemo(() => {
        if (!busca.trim()) return herois;
        const termo = busca.toLowerCase();
        return herois.filter((h) => {
            const nome = (h.nome || '').toLowerCase();
            const hab = (h.habilidade || '').toLowerCase();
            return nome.includes(termo) || hab.includes(termo);
        });
    }, [herois, busca]);

    // Converte e normaliza o valor de força para a barra de poder
    const calcularPorcentagemForca = (forca) => {
        const num = parseFloat(forca);
        if (isNaN(num)) return 50;
        if (num <= 10) return num * 10; // escala 0-10
        if (num > 100) return 100;
        return Math.min(Math.max(num, 15), 100);
    };

    // Cor dinâmica de acordo com a força
    const getCorForca = (porcentagem) => {
        if (porcentagem >= 85) return '#EF4444'; // Vermelho super poderoso
        if (porcentagem >= 65) return '#F59E0B'; // Amarelo / Dourado
        if (porcentagem >= 45) return '#3B82F6'; // Azul herói
        return '#10B981'; // Verde protetor
    };

    const renderCardHeroi = ({ item }) => {
        const pctForca = calcularPorcentagemForca(item.forca);
        const corPoder = getCorForca(pctForca);
        const temFotoValida = item.foto && !errosFoto[item.id];
        const cardMaxWidth =
            numColumns === 3 ? '31.8%' : numColumns === 2 ? '48.5%' : 460;

        return (
            <View style={[styles.card, { maxWidth: cardMaxWidth }]}>
                {/* Imagem do Herói com Badge de Poder */}
                <View style={styles.imageContainer}>
                    {temFotoValida ? (
                        <Image
                            source={{ uri: item.foto }}
                            style={styles.heroImage}
                            resizeMode="cover"
                            onError={() =>
                                setErrosFoto((prev) => ({ ...prev, [item.id]: true }))
                            }
                        />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderEmoji}>🦸‍♂️</Text>
                            <Text style={styles.placeholderText}>Super-Herói</Text>
                        </View>
                    )}

                    {/* Badge flutuante com a Força */}
                    <View style={[styles.powerBadge, { backgroundColor: corPoder }]}>
                        <Text style={styles.powerBadgeIcon}>⚡</Text>
                        <Text style={styles.powerBadgeText}>{item.forca || '?'}</Text>
                    </View>
                </View>

                {/* Conteúdo Informativo */}
                <View style={styles.cardContent}>
                    <Text style={styles.heroName} numberOfLines={1}>
                        {item.nome}
                    </Text>

                    {/* Barra de Poder / Força Visual */}
                    <View style={styles.powerBarSection}>
                        <View style={styles.powerBarHeader}>
                            <Text style={styles.powerBarTitle}>NÍVEL DE FORÇA</Text>
                            <Text style={[styles.powerBarValue, { color: corPoder }]}>
                                {item.forca} pts
                            </Text>
                        </View>
                        <View style={styles.powerTrack}>
                            <View
                                style={[
                                    styles.powerFill,
                                    { width: `${pctForca}%`, backgroundColor: corPoder },
                                ]}
                            />
                        </View>
                    </View>

                    {/* Habilidades */}
                    {item.habilidade ? (
                        <View style={styles.abilitySection}>
                            <Text style={styles.abilityLabel}>PODER ESPECIAL</Text>
                            <View style={styles.abilityChip}>
                                <Text style={styles.abilityIcon}>✨</Text>
                                <Text style={styles.abilityText} numberOfLines={2}>
                                    {item.habilidade}
                                </Text>
                            </View>
                        </View>
                    ) : null}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />

            <View style={styles.container}>
                {/* Cabeçalho Temático e Amigável */}
                <View style={styles.header}>
                    <View style={styles.topBadge}>
                        <Text style={styles.topBadgeText}>⭐ QUARTEL-GENERAL ⭐</Text>
                    </View>
                    <Text style={styles.title}>Universo dos Heróis</Text>
                    <Text style={styles.subtitle}>
                        Descubra os poderes dos seus heróis favoritos! 🦸‍♂️💥
                    </Text>

                    {/* Barra de Busca Minimalista */}
                    <View style={styles.searchBox}>
                        <Text style={styles.searchIcon}>🔍</Text>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar herói ou poder..."
                            placeholderTextColor="#94A3B8"
                            value={busca}
                            onChangeText={setBusca}
                            autoCorrect={false}
                        />
                        {busca.length > 0 && (
                            <TouchableOpacity
                                onPress={() => setBusca('')}
                                style={styles.clearButton}
                                activeOpacity={0.7}
                            >
                                <Text style={styles.clearButtonText}>✕</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Área de Conteúdo */}
                {carregando && (
                    <View style={styles.centerState}>
                        <View style={styles.loadingBubble}>
                            <ActivityIndicator size="large" color="#2563EB" />
                            <Text style={styles.loadingTitle}>Invocando heróis... ⚡</Text>
                            <Text style={styles.loadingSubtitle}>
                                Preparando os superpoderes!
                            </Text>
                        </View>
                    </View>
                )}

                {erro && !carregando && (
                    <View style={styles.centerState}>
                        <View style={styles.errorCard}>
                            <Text style={styles.errorIcon}>💥</Text>
                            <Text style={styles.errorTitle}>Missão Secreta em Andamento!</Text>
                            <Text style={styles.errorSubtitle}>
                                Não conseguimos carregar a lista de heróis agora.
                            </Text>
                            <TouchableOpacity
                                style={styles.retryButton}
                                onPress={carregaHeroes}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.retryButtonText}>Tentar Novamente 🔄</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {!carregando && !erro && (
                    <FlatList
                        key={`grid-${numColumns}`}
                        data={heroisFiltrados}
                        keyExtractor={(item, index) =>
                            item.id ? String(item.id) : `heroi-${index}`
                        }
                        renderItem={renderCardHeroi}
                        numColumns={numColumns}
                        columnWrapperStyle={
                            numColumns > 1 ? styles.columnWrapper : null
                        }
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        refreshing={carregando}
                        onRefresh={carregaHeroes}
                        ListHeaderComponent={
                            heroisFiltrados.length > 0 ? (
                                <View style={styles.counterRow}>
                                    <Text style={styles.counterText}>
                                        ⚡ {heroisFiltrados.length}{' '}
                                        {heroisFiltrados.length === 1
                                            ? 'herói em ação'
                                            : 'heróis prontos para a missão'}
                                    </Text>
                                </View>
                            ) : null
                        }
                        ListEmptyComponent={
                            <View style={styles.emptyCard}>
                                <Text style={styles.emptyIcon}>🔎🦸‍♂️</Text>
                                <Text style={styles.emptyTitle}>Herói não encontrado</Text>
                                <Text style={styles.emptySubtitle}>
                                    Não encontramos nenhum defensor com &quot;{busca}&quot;. Que tal tentar
                                    outro nome?
                                </Text>
                                <TouchableOpacity
                                    style={styles.emptyButton}
                                    onPress={() => setBusca('')}
                                >
                                    <Text style={styles.emptyButtonText}>Limpar busca</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8FAFC',
        paddingTop: Platform.OS === 'android' ? 36 : 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#F1F5F9',
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 18,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        shadowColor: '#1E293B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
        elevation: 4,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
    },
    topBadge: {
        alignSelf: 'center',
        backgroundColor: '#EFF6FF',
        borderColor: '#BFDBFE',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 8,
    },
    topBadgeText: {
        fontSize: 11,
        fontWeight: '800',
        color: '#2563EB',
        letterSpacing: 0.8,
    },
    title: {
        fontSize: 26,
        fontWeight: '900',
        color: '#0F172A',
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 16,
        fontWeight: '500',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        borderRadius: 16,
        paddingHorizontal: 14,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        height: 48,
        width: '100%',
        maxWidth: 520,
        alignSelf: 'center',
    },
    searchIcon: {
        fontSize: 16,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#0F172A',
        fontWeight: '600',
    },
    clearButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#CBD5E1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    clearButtonText: {
        fontSize: 12,
        color: '#334155',
        fontWeight: 'bold',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 36,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
    },
    columnWrapper: {
        gap: 20,
        justifyContent: 'flex-start',
    },
    counterRow: {
        marginBottom: 14,
        paddingHorizontal: 4,
    },
    counterText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#475569',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        marginBottom: 20,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.07,
        shadowRadius: 12,
        elevation: 3,
        flex: 1,
        width: '100%',
        alignSelf: 'center',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#E2E8F0',
        overflow: 'hidden',
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        backgroundColor: '#DBEAFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderEmoji: {
        fontSize: 54,
    },
    placeholderText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2563EB',
        marginTop: 4,
    },
    powerBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    powerBadgeIcon: {
        fontSize: 12,
        marginRight: 4,
        color: '#FFFFFF',
    },
    powerBadgeText: {
        fontSize: 13,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    cardContent: {
        padding: 16,
    },
    heroName: {
        fontSize: 20,
        fontWeight: '900',
        color: '#0F172A',
        marginBottom: 12,
        letterSpacing: -0.3,
    },
    powerBarSection: {
        marginBottom: 14,
        backgroundColor: '#F8FAFC',
        padding: 10,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    powerBarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    powerBarTitle: {
        fontSize: 11,
        fontWeight: '800',
        color: '#64748B',
        letterSpacing: 0.5,
    },
    powerBarValue: {
        fontSize: 12,
        fontWeight: '900',
    },
    powerTrack: {
        height: 10,
        backgroundColor: '#E2E8F0',
        borderRadius: 5,
        overflow: 'hidden',
    },
    powerFill: {
        height: '100%',
        borderRadius: 5,
    },
    abilitySection: {
        marginTop: 2,
    },
    abilityLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#94A3B8',
        letterSpacing: 0.5,
        marginBottom: 6,
    },
    abilityChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#EEF2FF',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E0E7FF',
    },
    abilityIcon: {
        fontSize: 14,
        marginRight: 6,
    },
    abilityText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#4338CA',
        flex: 1,
    },
    centerState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    loadingBubble: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 28,
        paddingHorizontal: 32,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    loadingTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1E293B',
        marginTop: 14,
    },
    loadingSubtitle: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 4,
    },
    errorCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 26,
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#FECACA',
        width: '100%',
        maxWidth: 340,
    },
    errorIcon: {
        fontSize: 44,
        marginBottom: 10,
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: '900',
        color: '#DC2626',
        textAlign: 'center',
    },
    errorSubtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 6,
        marginBottom: 18,
        lineHeight: 18,
    },
    retryButton: {
        backgroundColor: '#DC2626',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 14,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
    },
    emptyCard: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 26,
        borderRadius: 22,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
        marginTop: 16,
    },
    emptyIcon: {
        fontSize: 42,
        marginBottom: 8,
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: '#1E293B',
    },
    emptySubtitle: {
        fontSize: 13,
        color: '#64748B',
        textAlign: 'center',
        marginTop: 4,
        marginBottom: 16,
        lineHeight: 18,
    },
    emptyButton: {
        backgroundColor: '#2563EB',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 12,
    },
    emptyButtonText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
});
