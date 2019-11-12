export default interface Translator{
    translate(text: string): Promise<string>
}