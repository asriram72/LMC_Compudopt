/** Flat laptop drawn around its own center: lid -62…43, base 43…55 (190 wide). */
export function Laptop({ lid, screen, base }: { lid: string; screen: string; base: string }) {
  return (
    <>
      <rect x={-80} y={-62} width={160} height={105} rx={8} fill={lid} />
      <rect x={-70} y={-53} width={140} height={86} rx={3} fill={screen} />
      <rect x={-95} y={43} width={190} height={12} rx={6} fill={base} />
    </>
  )
}
